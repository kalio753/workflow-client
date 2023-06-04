import { configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware from "@redux-saga/core"
import templateSlice from "./slices/templateSlice"
import rootSaga from "./saga/rootSaga"
import folderSlice from "./slices/folderSlice"
import modalVisibleSlice from "./slices/modalVisibleSlice"
import fakeDataSlice from "./slices/fakeDataSlice"
import stepsSlice from "./slices/stepsSlice"
import refreshVariableSlice from "./slices/refreshVariableSlice"
import globalVariableSlice from "./slices/globalVariableSlice"
import documentSlice from "./slices/documentSlice"
import actionSlice from "./slices/actionsSlice"

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: {
        template: templateSlice.reducer,
        folder: folderSlice.reducer,
        modalVisible: modalVisibleSlice.reducer,
        fakeData: fakeDataSlice.reducer,
        steps: stepsSlice.reducer,
        refreshVariable: refreshVariableSlice.reducer,
        globalVariable: globalVariableSlice.reducer,
        documents: documentSlice.reducer,
        action: actionSlice.reducer,
    },
    middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

export default store
