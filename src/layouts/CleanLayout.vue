<template>
  <div class="layout loginBackground">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'CleanLayout'
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.loginBackground {
  background: rgb(200, 103, 3);
  background: linear-gradient(
    144deg,
    rgba(200, 103, 3, 1) 0%,
    rgba(255, 130, 1, 1) 49%,
    rgba(255, 166, 74, 1) 100%
  );
}
</style>
