<template>
  <div class="confirm-role">
    <ul>
      <li v-for="player in players">
        {{ player.name }}
        <button type="submit" class="btn btn-primary">かくにん</button>
      </li>
    </ul>
    <div class="btn-container">
      <button type="submit" class="btn btn-primary">OK</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RegistPlayer',
  data() {
    return {
      players: [
        {
          'player_id': '1', 'name': 'わん', 'role': 'insider',
        },
        {
          'player_id': '2', 'name': 'に', 'role': 'commons',
        },
        {
          'player_id': '3', 'name': 'さん', 'role': 'commons',
        },
        {
          'player_id': '4', 'name': 'し', 'role': 'master',
        },
        {
          'player_id': '5', 'name': 'ご', 'role': 'commons',
        }
      ]
    };
  }
}
</script>

<style>
ul {
  list-style: none;
}
</style>
