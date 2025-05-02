import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen, within } from '@testing-library/svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
  test('should render h1', () => {
    render(Page);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('renders input and button', () => {
    render(Page);
    expect(screen.getByLabelText(/enter your name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /get started/i })).toBeInTheDocument();
  });

  test('shows welcome message after submitting name', async () => {
    render(Page);
    const input = screen.getByLabelText(/enter your name/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /get started/i });
    await input.focus();
    input.value = 'Alice';
    await input.dispatchEvent(new Event('input'));
    await button.click();
    const welcomeContainer = screen.getByLabelText(/dismiss/i).closest('div');
    expect(
      within(welcomeContainer!).getByText(
        (content, element) =>
          element?.tagName === "P" &&
          /welcome,\s*alice\s*!/i.test(element.textContent || "")
      )
    ).toBeInTheDocument();
  });

  test('dismisses welcome message', async () => {
    render(Page);
    const input = screen.getByLabelText(/enter your name/i) as HTMLInputElement;
    const button = screen.getByRole('button', { name: /get started/i });
    await input.focus();
    input.value = 'Bob';
    await input.dispatchEvent(new Event('input'));
    await button.click();
    const welcomeContainer = screen.getByLabelText(/dismiss/i).closest('div');
    expect(
      within(welcomeContainer!).getByText(
        (content, element) =>
          element?.tagName === "P" &&
          /welcome,\s*bob\s*!/i.test(element.textContent || "")
      )
    ).toBeInTheDocument();
    const dismiss = screen.getByLabelText(/dismiss/i);
    await dismiss.click();
    expect(
      within(welcomeContainer!).queryByText(
        (content, element) =>
          element?.tagName === "P" &&
          /welcome,\s*bob\s*!/i.test(element.textContent || "")
      )
    ).not.toBeInTheDocument();
  });
});
