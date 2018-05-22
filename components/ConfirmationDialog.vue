<template>
  <v-dialog :value="confirmer.active" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">{{confirmer.title || "¿Estás seguro?"}}</v-card-title>
      <v-card-text >{{confirmer.body || "Esta acción no se puede deshacer"}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" flat @click.native="confirm">{{confirmer.confirmBtn || "Confirmar"}}</v-btn>
        <v-btn color="secondary" flat @click.native="cancel">{{confirmer.cancelBtn || "Cancelar"}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    confirmer() {
      return this.$store.state.confirmer
    }
  },
  methods: {
    confirm() {
      this.confirmer.resolve(true)
      this.$store.commit('confirmer/DEACTIVATE')
    },
    cancel() {
      this.confirmer.resolve(false)
      this.$store.commit('confirmer/DEACTIVATE')
    }
  }
}
</script>

<style>

</style>
