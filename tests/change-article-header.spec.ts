import { test, expect } from './fixtures';
import { createArticle, articleToShow } from './user-data';

test('Change avatar', async ({ page, registerUser }) => {
    const newTitle = 'New Header';
    const article = createArticle();

    await page.route('**/api/articles', async (route) => {
        const request = route.request();

        if(request.method() === 'POST') {
            const postData = request.postDataJSON();
            const modifiedData = postData.article
                ? { ...postData, article: { ...postData.article, title: newTitle } }
                : { ...postData, title: newTitle };
        await route.continue({
            postData: JSON.stringify(modifiedData),
        });
    } else {
        await route.continue();
        }
    });

    await page.goto(`/articles`);
    await page.getByTestId("nav-new-article").click();
    await page.getByTestId("editor-title").fill(article.title);
    await page.getByTestId("editor-description").fill(article.description);
    await page.getByTestId("editor-body").fill(article.body);
    await page.getByTestId("editor-submit").click();
    await expect(page.getByTestId("article-title")).toHaveText(newTitle);
});

test('Get articles list', async ({ page }) => {
    await page.route('**/api/articles?**', async (route, request) => {
        await route.fulfill({
            json: { articles: [articleToShow], articlesCount: 1 },
            status: 200,
            contentType: 'application/json'
        });
    })

    await page.goto('/articles');
    await page.waitForResponse('**/api/articles?**');
    await expect(page.getByTestId("article-list")).toHaveCount(1);
    await expect(page.getByTestId("preview-title")).toHaveText(articleToShow.title);
})