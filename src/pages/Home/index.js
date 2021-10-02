import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tableAction } from 'stores/reducers/dashboard'
import TableDetail from './components/TableDetail'
import ChefDetail from './components/ChefDetail'
import ListTable from './components/ListTable'
import { emitTable } from 'services/SocketIO/EmitServer'
import { Notify } from 'components/Notify'
import 'styles/_Home.scss'
import { HandleAddFoodForTable } from 'common/HandleAddFoodForTable'

const Home = (props) => {
    const state = useSelector((state) => state.dashboard)
    const isRedirectDetail = state?.isRedirectDetail
    const profile = useSelector((state) => state.user.profile)
    const tableCurrent = state?.table
    const tablesActive = state?.data
    const dispatch = useDispatch()

    const handleGetTableDetail = () => {
        if (!tablesActive) return
        const result = tablesActive.filter((item) => item.id === tableCurrent.id)
        if (result.length === 0) {
            return {}
        }
        return result[0]
    }

    const onClose = () => {
        dispatch(tableAction.setIsDetail(false))
        dispatch(tableAction.table(false))
    }

    const handleSelectTable = (objTable) => {
        if (profile?.position === 'Staff') {
            // IF POSITION IS STAFF => TABLE IS CREATED
            if (objTable?.id) {
                const initialTableClient = {
                    id: objTable.id,
                    name: objTable.name,
                    roleUser: profile?.position,
                }
                emitTable.addTable(initialTableClient)
            }
        }
        dispatch(tableAction.setIsDetail(true))
        dispatch(tableAction.table(objTable))
    }

    const handleRemoveMenu = (objFood, idTable) => {
        const payload = { id: idTable, food: objFood }
        emitTable.removeFood(payload)
    }

    const handleAddMenu = (objFood, idTable) => {
        if (profile?.position === 'Admin') {
            Notify('error', 'Error', "Admin isn't allow do this action")
            return
        }
        HandleAddFoodForTable(objFood, idTable, profile.position)
    }

    return (
        <>
            {isRedirectDetail ? (
                profile?.position === 'Staff' || profile?.position === 'Admin' ? (
                    <TableDetail
                        detailTable={handleGetTableDetail()}
                        handleAddMenu={handleAddMenu}
                        handleRemoveMenu={handleRemoveMenu}
                        onClose={onClose}
                    />
                ) : (
                    <ChefDetail table={handleGetTableDetail()} />
                )
            ) : (
                <ListTable
                    listTable={tablesActive}
                    handleSelectTable={handleSelectTable}
                />
            )}
        </>
    )
}

Home.propTypes = {}

export default Home
