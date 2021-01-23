import React from "react";
import { ApolloClient, InMemoryCache, HttpLink, useMutation, ApolloProvider, } from "@apollo/client";
import * as user_queries from "../../queries/user";
import LoadingPopup from "../../components/Loader/LoadingPopup";
import { createToast } from "../../utils/toast";

const Review = ({ setForm, formData, navigation }) => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirm_password,
        no_of_plants,
        temp_21,
        alias_21,
        temp_16,
        alias_16,
        temp_26,
        alias_26,
        temp_19,
        alias_19,
        temp_13,
        alias_13
    } = formData;
    const { go } = navigation;

    const client = new ApolloClient({
        link: new HttpLink({
            uri: process.env.REACT_APP_GRAPHQL_URL,
            headers: {
                "x-hasura-admin-secret": "garduino123",
            },
        }),
        cache: new InMemoryCache(),
    });

    const [
        createUser,
        { loading: mutationLoading, error: mutationError, data: mutationResponse },
    ] = useMutation(user_queries.CREATE_USER, {
        client: client,
        onCompleted: (data) => {
            console.log("User Created!");
            window.location = `${process.env.REACT_APP_LOGIN_URL}`;
        },
    });

    return (
        <ApolloProvider client={client}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    let role = 1;

                    const variables = {
                        first_name: firstName,
                        last_name: lastName,
                        email: email,
                        password: password,
                        plant_count: no_of_plants,
                        role: role,
                    };

                    console.log(variables);
                    createUser({
                        variables: variables,
                    });
                }}>
                <div className="form">
                    <h3>Review your data</h3>
                    <h4>
                        Name
        <button onClick={() => go("userdetails")}>Edit</button>
                    </h4>
                    <div>
                        {" "}
            First name: {`${firstName}`},
        <br />
             Last Name: {`${lastName}`},
        </div>
                    <div>Email Id: {`${email}`}</div>
                    <div>
                        Password: {`${password}`},
        <br />
            Confirm Password: {` ${confirm_password}`},
        <br />
            Number of plants: {`${no_of_plants}`}
                    </div>
                    <h4>
                        Technical Details
        <button onClick={() => go("technicaldetails")}>Edit</button>
                    </h4>
                    <div>
                        GPIO 21: {`${temp_21}`},{`${alias_21}`}
                        <br />
            GPIO 16: {`${temp_16}`},{`${alias_16}`}
                        <br />
            GPIO 26: {`${temp_26}`},{`${alias_26}`}
                        <br />
            GPIO 19: {`${temp_19}`},{`${alias_19}`}
                        <br />
            GPIO 13: {`${temp_13}`},{`${alias_13}`}
                        <br />
                    </div>
                    <div>
                        <button outline color='info' type='submit'>SignUp</button>
                        {/*<button onClick={() => go("submit")}>Submit</button>*/}
                    </div>
                </div>
            </form>
            {mutationLoading && <LoadingPopup isOpen />}
            {mutationError && createToast({ message: "some Error Occurred" })}
        </ApolloProvider>
    );

};

export default Review;