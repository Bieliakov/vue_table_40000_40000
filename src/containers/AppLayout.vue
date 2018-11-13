<template>
  <div class="centrify-container">
    <app-table></app-table>
  </div>
</template>

<script>
  import Table from './table/Table.vue';

  export default {
    components: {
      appTable: Table,
    }
  }
</script>

<style>
  /* reset css */

  html {
    box-sizing: border-box;
    font-size: 16px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }

  ol, ul {
    list-style: none;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  /* end reset css */

  button {
    cursor: pointer;
  }

  .centrify-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border {
    border: 1px solid lightseagreen;
  }

  .button {
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }

  .button-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
  }
</style>
