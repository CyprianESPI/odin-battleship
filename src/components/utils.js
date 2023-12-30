class Utils {
    static removeContent(elem) {
        if (elem === null | elem === undefined) {
            console.error("Utils.removeContent, elem is", elem);
            return;
        }
        while (elem.firstChild) {
            elem.firstChild.remove();
        }
    }

    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    static removeIndexFromArray(arr, index) {
        if (index > -1) { // only splice array when item is found
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
    }

    static removeObjFromArray(arr, item) {
        const index = arr.indexOf(item);
        if (index > -1) { // only splice array when item is found
            arr.splice(index, 1); // 2nd parameter means remove one item only
        }
    }
}

export default Utils;