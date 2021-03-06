import React from 'react';
import PropTypes from 'prop-types';
import muiThemeable from 'material-ui/styles/muiThemeable';
import { FlatButton } from 'material-ui';
import { grey200 } from 'material-ui/styles/colors';

/**
 * The action area of a notifaction as shown in https://material.io/guidelines/patterns/notifications.html#notifications-anatomy-of-a-notification
 * and adjusted for the web.
 * 
 * @author Timo Hanisch <timohanisch@googlemail.com>
 * @since 0.1.0
 */
class NotificationActionArea extends React.PureComponent {

    static propTypes = {
        /* An array of action objects which are shown as flat buttons at the bottom of the notification */
        actions: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            onClick: PropTypes.func.isRequired,
        })).isRequired,

        /* By default notifications use the primary1color defined for the material-ui theme for the header and actions. */
        primaryColor: PropTypes.string,
    };

    static defaultProps = {
        primaryColor: '',
    };

    static STYLES = {
        container: {
            display: 'flex',
            flexDirection: 'row',
            padding: 8,
            backgroundColor: grey200,
        },
        button: {
            minWidth: null, // We do not want the default width of 88px
        },
        buttonLabel: {
            padding: '0 8px 0 8px',
        },
    };

    render() {
        const { actions, muiTheme, primaryColor } = this.props;
        const styles = {
            // Inline style which is relies on dynamic information
            buttonLabel: {
                color: primaryColor || muiTheme.palette.primary1Color,
                ...NotificationActionArea.STYLES.buttonLabel,
            },
        };
        return (
            <div style={NotificationActionArea.STYLES.container}>
                {
                    actions.map((action, index) => (
                        <FlatButton
                            key={`nAction_${index}`}
                            label={action.label}
                            style={index > 0 ? { ...NotificationActionArea.STYLES.button, marginLeft: 8 } : NotificationActionArea.STYLES.button}
                            labelStyle={styles.buttonLabel}
                            onClick={action.onClick}
                        />
                    ))
                }
            </div>
        );
    }
}
// Use Material-UI HOC to get access to the used primary color
export default muiThemeable()(NotificationActionArea);