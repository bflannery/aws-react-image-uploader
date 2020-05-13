import React, { Component } from 'react'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";

const buttonStyling = 'w-md waves-effect waves-light'

class CroppingModal extends Component {
    constructor(props) {
        super(props)

        this.cropImage = this.cropImage.bind(this)
    }

    cropImage() {
        const { img } = this.props
        if (typeof this.cropperRef.getCroppedCanvas() === 'undefined') {
            return
        }
        this.props.onSave(this.cropperRef.getCroppedCanvas().toDataURL(img.content_type))
    }

    render() {
        const { closeModal, img, open, style, aspectRatio } = this.props

        return (
            <Dialog onClose={closeModal} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">Crop Image</DialogTitle>
                <div className="venue-img-cropping-modal-body">
                    <Cropper
                        className="venue-img-cropper"
                        ref={(cropper) => { this.cropperRef = cropper }}
                        src={img.image_data}
                        style={style}
                        aspectRatio={aspectRatio}
                        dragMode="move"
                    />
                </div>
                <div className="venue-img-cropping-modal-footer">
                    <button
                        id="venue-img-cropping-modal-cancel-button"
                        className={`btn btn-gray ${buttonStyling}`}
                        onClick={closeModal}
                    >
                        Cancel
                    </button>
                    <button
                        id="venue-img-cropping-modal-save-button"
                        className={`btn btn-primary ${buttonStyling}`}
                        onClick={this.cropImage}
                    >
                        OK
                    </button>
                </div>
            </Dialog>
        )
    }
}

export default CroppingModal
