import { test, expect } from '@playwright/test';

test.describe('TodoComponent', () => {
  test.beforeEach(async ({ page }) => {
    // Ajuste a URL conforme necessário para o seu ambiente local
    await page.goto('http://localhost:4200');
  });

  test('deve adicionar uma nova tarefa', async ({ page }) => {
    await page.fill('input[placeholder="Nova tarefa"]', 'Minha tarefa');
    await page.click('button:has-text("Adicionar")');
    await expect(page.locator('li')).toContainText('Minha tarefa2');
  });

  test('deve marcar uma tarefa como concluída', async ({ page }) => {
    await page.fill('input[placeholder="Nova tarefa"]', 'Concluir tarefa');
    await page.click('button:has-text("Adicionar")');
    const checkbox = page.locator('li input[type="checkbox"]').first();
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await expect(page.locator('li span.completed')).toHaveText('Concluir tarefa');
  });

  test('deve remover uma tarefa', async ({ page }) => {
    await page.fill('input[placeholder="Nova tarefa"]', 'Remover tarefa');
    await page.click('button:has-text("Adicionar")');
    const tarefa = page.locator('li', { hasText: 'Remover tarefa' });
    await expect(tarefa).toHaveCount(1);
    await tarefa.locator('button:has-text("Remover")').click();
    await expect(tarefa).toHaveCount(0);
  });
});
