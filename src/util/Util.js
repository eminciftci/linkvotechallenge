
export function sortAscending(list) {
    list.sort(function(a,b){
        return parseInt(a.points)  - parseInt(b.points);
    })

    return list;
}

export function sortDescending(list) {
    list.sort(function(a,b){
        return parseInt(a.points)  - parseInt(b.points);
    }).reverse()

    return list;
}

export function addTopOfList(object, list) {
    return [object, ...list];
}

export function voteUpSorting(list, index) {
    debugger;
    list[index].points += 1;
    for (let i = index; i > 0; i--) {
        if (list[i].points >= list[i - 1].points) {
            let temp = list[i - 1];
            list[i - 1] = list[i];
            list[i] = temp;
        } else
            break;
    }

    return list;
}

export function voteDownSorting(list, index) {
    if (list[index].points !== -1)
        list[index].points -= 1;

    for (let i = index; i < list.length; i++) {
        if (i + 1 < list.length) {
            if (list[i].points < list[i + 1].points) {
                let temp = list[i + 1];
                list[i + 1] = list[i];
                list[i] = temp;
            } else
                break;
        }
    }

    return list;
}