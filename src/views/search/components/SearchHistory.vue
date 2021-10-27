<template>
    <div>


        <van-cell icon="search" title="搜索历史" value="内容">
            <div slot="default" class="main-tip">
                <span @click="$emit('removeHistories',[])">全部删除</span>
                <van-icon name="delete"></van-icon>
            </div>
        </van-cell>


        <van-cell
                icon="search"
                v-for="(record,index) in searchHistoryRecord"
                :title="record"
                @click="$emit('search',record)"
        >
            <div>
                <van-icon name="close" @click.stop="removeHistory(index)"></van-icon>
            </div>
        </van-cell>


    </div>
</template>

<script>
    import {setItem} from "@/utils/storage";

    export default {
        name: "SearchHistory",
        props:{
            searchHistoryRecord:{

            },
        },
        methods:{
            removeHistory(index){
               this.searchHistoryRecord.splice(index,1);
            }
        },
        watch:{
            searchHistoryRecord:{
                deep: true,
                handler(newvalue,oldvalue){
                    setItem("searchHistoryRecord", this.searchHistoryRecord);
                }
            }
        }
    }
</script>

<style scoped>
.main-tip{
    display: flex;
    align-items: center;
    justify-content: flex-end;
}
    .main-tip  span{
        font-size: 11px;
    }
</style>