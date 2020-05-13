import React from 'react';
import './App.css';
import ImageDropZone from "./ImageDropzone";
import Grid from "@material-ui/core/Grid";


function App() {
    return (
    <div className="App">
        <Grid container>
            <Grid item lg={12}>
                <ImageDropZone />
            </Grid>
        </Grid>
    </div>
  );
}

export default App;
