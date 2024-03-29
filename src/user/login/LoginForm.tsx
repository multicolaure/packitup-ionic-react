import { IonCol, IonGrid, IonRow, IonText } from '@ionic/react';
import { FieldError, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import FormRow from '../../ui/form/FormRow';
import LoadableButton from '../../ui/loading/LoadableButton';
import { login, selectError, selectLoading, selectProvider } from '../user.slice';
import { Credentials, CredentialsSchema } from './credentials';
import { LoginError } from './login.service';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodIssueCode } from "zod";
import { useEffect } from 'react';
import Input from '../../ui/form/Input';


const toErrorMessage = (error?: LoginError): { message: string, field?: keyof Credentials } | undefined => {
    switch (error) {
        case LoginError.BAD_USERNAME:
            return {
                field: 'username',
                message: 'Invalid username'
            };
        case LoginError.WRONG_PASSWORD:
            return {
                field: 'password',
                message: 'Invalid password'
            };
        case LoginError.USER_NOT_FOUND:
            return {
                message: 'You don\'t have an account here'
            };
        case LoginError.OTHER:
            return {
                message: 'Hum, something went wrong, try again!'
            };
        default:
            return;
    }

}

const usernameErrorMessage = (fieldError?: FieldError): string | undefined => {
    if (!fieldError) {
        return undefined;
    }
    switch (fieldError.type) {
        case ZodIssueCode.too_small:
            return 'The username is required';
        default:
            return 'The username is invalid';
    }
}

const passwordErrorMessage = (fieldError?: FieldError): string | undefined => {
    if (!fieldError) {
        return undefined;
    }
    switch (fieldError?.type) {
        case ZodIssueCode.too_small:
            return 'The password must have at least 6 characters';
        default:
            return 'The password is invalid';
    }
}


const emptyForm: Credentials = {
    username: 'laure8973@hotmail.fr',
    password: '123456'
}


const LoginForm = () => {

    const loading = useSelector(selectLoading);
    const provider = useSelector(selectProvider);

    const dispatch = useDispatch();

    const { control, handleSubmit, formState: { errors, isValid, submitCount }, setError } = useForm<Credentials>({
        defaultValues: emptyForm,
        resolver: zodResolver(CredentialsSchema),
        mode: "onTouched"
    });


    const error = useSelector(selectError);

    useEffect(() => {
        const errorOptions = toErrorMessage(error);
        if (errorOptions) {
            const name = errorOptions.field ?? 'root';
            setError(name, {
                    type: 'server',
                    message: errorOptions.message
                }, { shouldFocus: !!errorOptions.field }
            );
        }
    }, [error, submitCount, setError]);
    

    const save = (credentials: Credentials) => {
        dispatch(login(credentials));
    }

    return (
        <form onSubmit={handleSubmit(save)}>
            <IonGrid>
                <FormRow>
                    <Input name="username"
                        control={control} 
                        label="Username" 
                        errorMessageProvider={usernameErrorMessage}
                        autocomplete="email" autofocus={true}/>
                </FormRow>
                <FormRow>
                <Input name="password"
                        control={control} 
                        label="Password" 
                        errorMessageProvider={passwordErrorMessage}
                        type="password" autocomplete="current-password"/>
                </FormRow>
                {errors.root && <IonRow><IonText color="danger" class="ion-padding" role="alert">{errors.root?.message}</IonText></IonRow>}
                <IonRow>
                    <IonCol class="piu-content-end">
                        <LoadableButton type="submit" disabled={!isValid} loading={loading && provider === 'Manual'}>Sign in</LoadableButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </form>
    );
};

export default LoginForm;
