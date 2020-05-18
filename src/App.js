import React, { useState } from 'react';
import './App.css';
import ImageDropZone from "./ImageDropzone";
import Grid from "@material-ui/core/Grid";
import Settings from "./Settings";


function App() {

    const DEFAULT_SETTINGS = {
        objectType: 'image',
    }

    const [settings, updateSettings ] = useState(DEFAULT_SETTINGS)

    const changeSettings = (settingsChanges) => {
        const newSettings = {
            ...settings,
            ...settingsChanges
        }

        updateSettings(newSettings)
    }

    return (
        <div className="App">
            <Grid container>
                <Grid item lg={12}>
                    <Settings
                        changeSettings={changeSettings}
                        settings={settings}
                    />
                    <ImageDropZone />
                </Grid>
            </Grid>
        </div>
    );
}

export default App;
