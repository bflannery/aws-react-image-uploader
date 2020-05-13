import React, { useRef } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(() => ({
    dialogFooter: {
        margin: '1rem 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    actionButton: {
        margin: '0 1rem 0 0',
    }
}))

const titleStyles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});


const DialogTitle = withStyles(titleStyles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});


const CroppingModal = ({ onSave, closeModal, img, open, style, aspectRatio }) => {
    let cropperRef = useRef()

    const classes = useStyles();

   const cropImage = () => {
        if (typeof cropperRef.getCroppedCanvas() === 'undefined') {
            return
        }
        onSave(cropperRef.getCroppedCanvas().toDataURL(img.content_type))
    }

    return (
        <Dialog onClose={closeModal} aria-labelledby="image-cropping-modal-title" open={open}>
            <DialogTitle
                onClose={closeModal}
                id="image-cropping-modal-title"
            >
                Crop Image
            </DialogTitle>
            <div className="image-cropping-modal-body">
                <Cropper
                    className="venue-img-cropper"
                    ref={(cropper) => { cropperRef = cropper }}
                    src={img.image_data}
                    style={{ height: 500, width: '100%' }}
                    aspectRatio={aspectRatio}
                    dragMode="move"
                />
            </div>
            <div className={classes.dialogFooter}>
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="secondary"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    className={classes.actionButton}
                    onClick={cropImage}
                    variant="contained"
                    color="primary"
                >
                    Crop and Upload
                </Button>
            </div>
        </Dialog>
    )
}

export default CroppingModal
