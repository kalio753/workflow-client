import { all } from "redux-saga/effects"
import { actionSaga } from "./watchers/actions"
import { documentSaga } from "./watchers/document"
import { fakeDataSaga } from "./watchers/fakeData"
import { folderSaga } from "./watchers/folder"
import { stepsSaga } from "./watchers/steps"
import { templateSaga } from "./watchers/template"

export default function* rootSaga() {
    yield all([
        ...templateSaga,
        ...folderSaga,
        ...fakeDataSaga,
        ...stepsSaga,
        ...documentSaga,
        ...actionSaga,
    ])
}
