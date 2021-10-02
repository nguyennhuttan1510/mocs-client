import { emitTable } from 'services/SocketIO/EmitServer'

export const HandleAddFoodForTable = (
    objFood,
    IDTable,
    positionUser,
    countFoods = 1
) => {
    const total = (objFood?.price * countFoods * (100 - objFood?.discount)) / 100
    const menu = {
        //a new food is added into list menu
        id: objFood?.id,
        name: objFood?.name,
        count: countFoods,
        price: objFood?.price,
        discount: objFood?.discount,
        url_image: objFood?.url_image,
        total: total,
        chef: false,
        status: 'Order', // Order| Pending | Done
    }
    const payload = {
        id: IDTable,
        food: menu,
        roleUser: positionUser,
    }
    emitTable.addMenu(payload)
}
