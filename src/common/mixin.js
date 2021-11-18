import { debounce } from "./utils";


export const itemListenrMixin = {
    //data methods componetnts 都可以
    mounted() {
        //监听图片加载 防抖动
        let newRefresh = debounce(this.$refs.scroll.refresh, 200);
        this.itemImgLoad = () => {
            newRefresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImgLoad);

    }
}


// export const BackTopMixin = {
//     components: {
//         BackTop
//     },
//     data() {
//         return {
//             isShowBackTop: false,
//         }
//     },
//     methods: {
//         backClick() {
//             this.$refs.scroll.scrollTo(0, 0, 300);
//         },
//     }
// }