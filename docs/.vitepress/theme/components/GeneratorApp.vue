<template>
  <div class="generator-container">
    <!-- Configuration Sidebar -->
    <GeneratorForm />

    <!-- Structure Simulation -->
    <SimulationTree />

    <!-- Generated Command Modal -->
    <CommandModal />
  </div>
</template>

<script setup>
import GeneratorForm from './GeneratorForm.vue';
import SimulationTree from './SimulationTree.vue';
import CommandModal from './CommandModal.vue';
</script>
