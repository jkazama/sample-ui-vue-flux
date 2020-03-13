<style lang="scss" scoped>
.l-item-type {
  width: 8rem;
}
.l-item-day {
  width: 6rem;
}
.l-item-currency {
  width: 3rem;
}
.l-item-amount {
  width: 10rem;
}
</style>

<template>
<div class="row">
  <div class="col">
    <list-group :fixed=true @bottom="next" :updating="updating" :fixedBottom=60>
      <li class="list-group-item d-flex flex-row" v-for="item in items" :key="item.id">
        <div class="l-item-day text-center">{{item.requestDay | day}}</div>
        <div class="l-item-type text-center">
          <span class="badge badge-secondary">{{item.statusType}}</span>
        </div>
        <div class="l-item-currency text-center ml-auto">{{item.currency}}</div>
        <div class="l-item-amount text-right">{{item.absAmount | amount}}</div>
      </li>
    </list-group>
  </div>
</div>
</template>

<script>
import ViewList from "@/views/mixins/view-list"
import ActionsAsset from "@/actions/mixins/asset"
export default {
  mixins: [ ViewList, ActionsAsset ],
  mounted() {
    this.onRefreshAsset(mutation => this.search())
  },
  methods: {
    action(data, success, failure) {
      this.findUnprocessedOut(data, success, failure)
    }
  }
}
</script>