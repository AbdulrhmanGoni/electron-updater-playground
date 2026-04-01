import { _electron as electron } from 'playwright';
import { globSync } from 'glob';

process.env.PLAYWRIGHT_TEST = 'true';

let executablePattern = 'dist/electron-updater-playground-*.AppImage';

const [executablePath] = globSync(executablePattern);
if (!executablePath) {
    throw new Error('App Executable path not found. Please compile the app first using: npm run compile');
}

async function launchAndTakeScreenshot() {
    const electronApp = await electron.launch({
        executablePath,
        args: ['--no-sandbox'],
    });

    electronApp.on('console', (msg) => {
        if (msg.type() === 'error') {
            console.error(`[electron][${msg.type()}] ${msg.text()}`);
        }
    });

    try {
        const page = await electronApp.firstWindow();

        // Capture errors
        page.on('pageerror', (error) => console.error('Page error:', error));

        // // Wait for the page to load
        await page.waitForLoadState('load');
        await page.waitForTimeout(1000);

        await page.screenshot({ path: `screenshot.png`, fullPage: true });
        await page.close();
    } finally {
        await electronApp.close();
    }
}

launchAndTakeScreenshot()
    .then(() => {
        console.log('Screenshot taken successfully');
    })
    .catch((error) => {
        console.error('Error taking screenshot:', error);
    });