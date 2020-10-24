$mo.define(exports => {
    let utils = {
        getType(data){
            return Object.prototype.toString.call(data)
                .replace("[object ", "")
                .slice(1, -1)
                .toLowerCase();
        },

        isEmpty(data) {
            if (["", null, undefined, 0].includes(data)) return true;
            if (typeof data === 'number' && isNaN(data)) return true;
            return false; 
        }
    }
    
    //导出
    exports("utils", utils)
});