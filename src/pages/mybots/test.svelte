<script>
// @ts-nocheck

	import { emailValidator, requiredValidator } from './validators.js'
  import { createFieldValidator } from './validation.js'

  const [ validity, validate ] = createFieldValidator(requiredValidator(), emailValidator())
	
	let email = null
</script>

<input class="input"
      type="text"
      bind:value={email}
      placeholder="Your Email"
			class:field-danger={!$validity.valid}
			class:field-success={$validity.valid}
      use:validate={email}
      />
{#if $validity.dirty && !$validity.valid}
<span class="validation-hint">
	INVALID - {$validity.message} {$validity.dirty}
</span>
{/if}

<button disabled={!$validity.valid}>Ok, I'm ready!</button>


