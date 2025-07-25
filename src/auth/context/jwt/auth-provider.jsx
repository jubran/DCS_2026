import PropTypes from "prop-types";
import { useMemo, useEffect, useReducer, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios"; // Import axios directly
import { endpoints } from "src/utils/axios"; // Import your endpoints

import { AuthContext } from "./auth-context";
import { setSession, isValidToken } from "./utils";
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = ( state, action ) =>
{
  switch ( action.type ) {
    case "INITIAL":
      return {
        loading: false,
        user: action.payload.user,
      };
    case "LOGIN":
    case "REGISTER":
      return {
        ...state,
        user: action.payload.user,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

// ----------------------------------------------------------------------

const STORAGE_KEY = "accessToken";

export function AuthProvider ( { children } )
{
  const [ state, dispatch ] = useReducer( reducer, initialState );
  const navigate = useNavigate();

  // Determine the API base URL based on the environment variable
  const apiBaseUrl = import.meta.env.VITE_HOST_API;

  // Determine if we're using axios or jquery based on the API base URL
  const isAxios = apiBaseUrl.includes( "vercel.app" ); // Adjust this condition as needed

  const initialize = useCallback( async () =>
  {
    try {
      const accessToken = sessionStorage.getItem( STORAGE_KEY );

      if ( accessToken && isValidToken( accessToken ) ) {
        setSession( accessToken );

        // Use axios for the "me" endpoint regardless of the API client
        const response = await axios.get( `${ apiBaseUrl }/dashboard`, {
          headers: {
            Authorization: `Bearer ${ accessToken }`,
          },
        } );

        const { user } = response.data;

        dispatch( {
          type: "INITIAL",
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        } );
      } else {
        setSession( null );
        dispatch( {
          type: "INITIAL",
          payload: {
            user: null,
          },
        } );
        navigate( "/auth/jwt/login?returnTo=%2Fdashboard" );
      }
    } catch ( error ) {
      console.error( error );
      setSession( null );
      dispatch( {
        type: "INITIAL",
        payload: {
          user: null,
        },
      } );
      navigate( "/auth/jwt/login?returnTo=%2Fdashboard" );
    }
  }, [ apiBaseUrl, navigate ] );

  useEffect( () =>
  {
    initialize();
  }, [ initialize ] );

  const login = useCallback(
    async ( user_name, password ) =>
    {
      try {
        const response = await await axios.post( "/api/api.php?action=fetchAuth", JSON.stringify( { user_name, password } ), {
          headers: { "Content-Type": "application/json" }
        } );

        console.log( "Response data:", response.data );


        const { accessToken, username } = response.data;

        if ( !response.data.accessToken ) {
          console.error( "Login error response:", response.data );
          throw new Error( response.data.error || "No accessToken in response" );
        }

        setSession( accessToken );

        dispatch( {
          type: "LOGIN",
          payload: {
            user: {
              username,
            },
            accessToken,
          },
        } );
      } catch ( error ) {
        console.error( "Login failed:", error );
      }
    },
      [apiBaseUrl]
  );


  // const login = useCallback(
  //   async (email, password) => {
  //     const data = {
  //       email,
  //       password,
  //     };

  //     let response;

  //     if (isAxios) {
  //       // Use axios for the login endpoint
  //       response = await axios.post(`${apiBaseUrl}/api/auth/login`, data);
  //     } else {
  //       // Use jquery for the login endpoint
  //       response = await axios.post(`${apiBaseUrl}/api/api.php?action=fetchAuth`, data);
  //     }

  //     const { accessToken, user } = response.data;

  //     setSession(accessToken);

  //     dispatch({
  //       type: "LOGIN",
  //       payload: {
  //         user: {
  //           ...user,
  //           accessToken,
  //         },
  //       },
  //     });
  //   },
  //   [apiBaseUrl, isAxios]
  // );

  const register = useCallback(
    async ( email, password, firstName, lastName ) =>
    {
      const data = {
        email,
        password,
        firstName,
        lastName,
      };

      // Use axios for the register endpoint
      const response = await axios.post( `${ apiBaseUrl }/api/auth/register`, data );

      const { accessToken, user } = response.data;

      sessionStorage.setItem( STORAGE_KEY, accessToken );

      dispatch( {
        type: "REGISTER",
        payload: {
          user: {
            ...user,
            accessToken,
          },
        },
      } );
    },
    [ apiBaseUrl ]
  );

  const logout = useCallback( async () =>
  {
    setSession( null );
    dispatch( {
      type: "LOGOUT",
    } );
    navigate( "/auth/jwt/login?returnTo=%2Fdashboard" );
  }, [ navigate ] );

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? "authenticated" : "unauthenticated";

  const status = state.loading ? "loading" : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ( {
      user: state.user,
      method: isAxios ? "axios" : "jquery", // Reflect the API client in the context value
      loading: status === "loading",
      authenticated: status === "authenticated",
      unauthenticated: status === "unauthenticated",
      //
      login,
      register,
      logout,
    } ),
    [ login, logout, register, state.user, status, isAxios ]
  );

  return (
    <AuthContext.Provider value={ memoizedValue }>
      { children }
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};