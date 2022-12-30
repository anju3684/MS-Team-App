import * as React from "react";
import { Provider, Flex, Text, Button, Header } from "@fluentui/react-northstar";
import { useState, useEffect } from "react";
import { useTeams } from "msteams-react-base-component";
import { app, authentication } from "@microsoft/teams-js";
import { Form, FormInput, FormCheckbox, FormButton } from '@fluentui/react-northstar';
import jwtDecode from "jwt-decode";

/**
 * Implementation of the Form-Tab content page
 */
export const FormTab = () => {

    const [{ inTeams, theme, context }] = useTeams();
    const [entityId, setEntityId] = useState<string | undefined>();
    const [name, setName] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        if (inTeams === true) {
            authentication.getAuthToken({
                resources: [process.env.TAB_APP_URI as string],
                silent: false
            } as authentication.AuthTokenRequestParameters).then(token => {
                const decoded: { [key: string]: any; } = jwtDecode(token) as { [key: string]: any; };
                setName(decoded!.name);
                app.notifySuccess();
            }).catch(message => {
                setError(message);
                app.notifyFailure({
                    reason: app.FailedReason.AuthFailed,
                    message
                });
            });
        } else {
            setEntityId("Not in Microsoft Teams");
        }
    }, [inTeams]);

    useEffect(() => {
        if (context) {
            setEntityId(context.page.id);
        }
    }, [context]);

    /**
     * The render() method to create the UI of the tab
     */
    return (
        <Form
        onSubmit={() => {
          alert('Form submitted');
        }}
      >
        <FormInput label="First name" name="firstName" id="first-name" required showSuccessIndicator={false} />
        <FormInput label="Last name" name="lastName" id="last-name" required showSuccessIndicator={false} />
        <FormCheckbox label="I agree to the Terms and Conditions" id="conditions" />
        <FormButton content="Submit" />
      </Form>
    );
};
