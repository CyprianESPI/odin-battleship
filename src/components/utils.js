class Utils {
    static removeContent(elem) {
        while (elem.firstChild) {
            elem.firstChild.remove();
        }
    }

    static isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
}

export default Utils;