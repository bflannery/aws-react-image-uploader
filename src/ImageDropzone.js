import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Grid from "@material-ui/core/Grid";
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
    imageContainer: {
        padding: '4px',
        height: '20rem',
        width: '20rem',
    },
    dropzone: {
        height: '20rem',
        width: '20rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed black'
    }
}));


const ImageDropZone = ({ addImage }) => {


    const initialState = {
        cropping: false,
        pendingImage: null,
    }

    // Initialize State
    const [{ cropping, pendingImage, croppedImage }, setLogoState] = useState(initialState)


    // Handle accepted dropzone files
    const handleDropAccepted = (venueImage) => setLogoState({
        pendingImage: venueImage,
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
            ...pendingImage,
            image_data: croppedImage,
        }

        // Update component image state
        return setLogoState({
            ...initialState,
            croppedImage: formattedCroppedImage
        })
    }

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

    console.log({ cropping, pendingImage, croppedImage })

    const renderDropzone = () => (
        <Paper className={classes.paper}>
            <div {...getRootProps({
                className: classes.dropzone
            })}>
                <input {...getInputProps()} />
                {isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop an image file here, or click to select file</p>
                }
            </div>
        </Paper>
    )

    const renderCroppedImage = () => (
        <div className={classes.imageContainer}>
            <img
                src={croppedImage.image_data}
                alt="venue-logos"
                height="100%"
                width="100%"
                className="venue-image"
            />
        </div>
    )

    const renderCroppingModal = () => (
        <CroppingModal
            open={cropping}
            closeModal={handleCloseCroppingModal}
            onSave={handleCropAccepted}
            img={pendingImage}
            style={{ height: '50rem', width: '50rem' }}
            aspectRatio={1}
        />
    )

    return (
        <Grid className={classes.root}>
            <Grid container justify="center" spacing={1}>
                <Grid
                    className={classes.mainContainer}
                    item
                >
                    {!pendingImage && !croppedImage && renderDropzone()}
                    {croppedImage && renderCroppedImage()}
                </Grid>
                {cropping && renderCroppingModal()}
            </Grid>
        </Grid>
    )
}

export default ImageDropZone
