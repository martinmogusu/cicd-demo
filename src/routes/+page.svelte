<script lang="ts">
  let name = '';
  let submittedName = '';

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    submittedName = name;
  }

  function dismissMessage() {
    submittedName = '';
  }
</script>

<div class="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
  <header class="text-center mb-8">
    <h1 class="text-4xl font-extrabold text-gray-800 sm:text-5xl">
      Welcome to Your Demo App
    </h1>
    <p class="mt-4 text-lg text-gray-600">
      Building great experiences, one step at a time.
    </p>
  </header>

  <main class="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
    <form
      class="space-y-4"
      on:submit={handleSubmit}
    >
      <div>
        <label
          for="name"
          class="block text-sm font-medium text-gray-700"
        >
          Enter your name
        </label>
        <input
          id="name"
          type="text"
          bind:value={name}
          placeholder="Your name"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Get Started
      </button>
    </form>

    {#if submittedName}
      <div class="relative mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md text-center">
        <button
          on:click={dismissMessage}
          class="absolute top-2 right-2 text-blue-600 hover:text-blue-800 focus:outline-none"
          aria-label="Dismiss"
        >
          ✕
        </button>
        <p class="text-lg text-gray-700">
          Welcome, <span class="font-semibold text-blue-600">{submittedName}</span>!
        </p>
      </div>
    {/if}
  </main>

  <footer class="mt-8 text-center text-sm text-gray-500">
    © 2025 Your Company. All rights reserved.
  </footer>
</div>
