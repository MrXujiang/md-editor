import React from 'react';
import { EditorContainer } from './components/EditorContainer';
import styles from './index.less';

function App() {
    return (
        <div className={styles.app}>
            <EditorContainer />
        </div>
    );
}

export default App;