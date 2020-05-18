import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const Settings = ({settings, changeSettings }) => {
    const objectTypes = [
        { value: 'image', label: 'Image' },
        { value: 'video', label: 'Video' },
        { value: 'file', label: 'File' },
    ]

    const changeObjectType = (e) => changeSettings({ objectType: e.target.value })
    console.log({ settings })
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Object Type </FormLabel>
            {objectTypes.map((objectType, i) => (
                <FormControlLabel
                    key={i}
                    value={objectType.value}
                    control={
                        <Radio
                            checked={settings.objectType === objectType.value}
                            onChange={changeObjectType}
                        />
                    }
                    label={objectType.label}
                />
            ))}
                {/*<FormControlLabel value="female" control={<Radio onChange={changeSettings} />} label="Female" />*/}
                {/*<FormControlLabel value="male" control={<Radio onChange={changeSettings} />} label="Male" />*/}
                {/*<FormControlLabel value="other" control={<Radio onChange={changeSettings} />} label="Other" />*/}
                {/*<FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" />*/}
        </FormControl>
    );
}

export default Settings


