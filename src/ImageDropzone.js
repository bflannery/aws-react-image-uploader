import React, {useCallback, useRef, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from "@material-ui/core/Grid";
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css';
import CroppingModal from "./CroppingModal";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    mainContainer: {
    },
    paper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    dropzone: {
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed black'
    }
}));


const ImageDropZone = () => {
    const cropperRef = useRef()

    const initialState = {
        cropping: false,
        pendingLogo: null,
    }

    // Initialize State
    const [{ cropping, pendingLogo }, setLogoState] = useState(initialState)


    // Handle accepted dropzone files
    const handleDropAccepted = (venueImage) => setLogoState({
        pendingLogo: venueImage,
        cropping: true,
    })

    // Handle rejected dropzone files
    const handleDropRejected = (error) => {
        console.log({ error })
        setLogoState({ cropping: false })
    }

    // Handle cropped files
    const handleCropAccepted = (croppedImage) => {
        // Format cropped image
        const formattedCroppedImage = {
            ...pendingLogo,
            image_data: croppedImage,
        }

        // Update redux gallery state
        // editLogo(formattedCroppedImage)

        // Update component gallery state
        return setLogoState(initialState)
    }

    // Filter image gallery and call redux action to update gallery array
    const handleRemoveImage = () => setLogoState(initialState)

    // Close cropping modal
    const handleCloseCroppingModal = () => setLogoState(initialState)

    const classes = useStyles();

    const onDrop = useCallback((acceptedFiles) => {
        console.log('ACCEPTED')
        acceptedFiles.forEach((file) => {

            const formattedImagePayload = {
                image_filename: file.name,
                content_type: file.type,
            }

            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => handleDropAccepted({
                ...formattedImagePayload,
                image_data: reader.result
            })
            reader.readAsDataURL(file)
        })

    }, [])

    const onDropRejected = useCallback(() => {
         console.log('REJECTD')
        const error = {
            title: 'Upload Error',
            body: {
                description: `The file could not be uploaded. Files should be .jpg or .png 
                and must be smaller than 2MB in size.`
            }
        }
        handleDropRejected(error)
    }, [])

    const acceptedFiles = ['image/jpeg', 'image/png']

    const dropzoneOptions = { onDrop, onDropRejected, accept: acceptedFiles }

    const {
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone(dropzoneOptions)

    console.log({ cropping, pendingLogo })
    return (
        <Grid className={classes.root}>
            <Grid container justify="center" spacing={1}>
                <Grid
                    className={classes.mainContainer}
                    item
                >
                    {!pendingLogo && (
                        <Paper className={classes.paper}>
                            <div {...getRootProps({
                                className: classes.dropzone
                            })}>
                                <input {...getInputProps()} />
                                {isDragActive ?
                                    <p>Drop the files here ...</p> :
                                    <p>Drag 'n' drop some files here, or click to select files</p>
                                }
                            </div>
                        </Paper>
                    )}
                </Grid>
            </Grid>
            {cropping && (
                <CroppingModal
                    open={cropping}
                    closeModal={handleCloseCroppingModal}
                    onSave={handleCropAccepted}
                    img={pendingLogo}
                    style={{ height: '50rem', width: '50rem' }}
                    aspectRatio={1}
                />
            )}
        </Grid>


    )
}

export default ImageDropZone
