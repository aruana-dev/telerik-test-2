import React, { useContext, useState } from "react"
import * as RealmWeb from "realm-web"

const RealmAppContext = React.createContext<any>({ logIn: null, logOut: null, user: null })

const RealmApp = ({ children }: any) => {
    const REALM_APP_ID = "aruana-jobfairy-demo-app-wqrxo"
    const app = new RealmWeb.App({ id: REALM_APP_ID })
    const [user, setUser] = useState<any>(null)

    // const logIn = async (email: string, password: string) => {
    //     const credentials = RealmWeb.Credentials.emailPassword(email, password)
    //     try {
    //         await app.logIn(credentials)
    //         setUser(app.currentUser)
    //         return app.currentUser
    //     } catch (e) {
    //         setUser(null)
    //         return null
    //     }
    // }

    const logIn = async () => {
        const credentials = RealmWeb.Credentials.anonymous()
        try {
            await app.logIn(credentials)
            setUser(app.currentUser)
            return app.currentUser
        } catch (e) {
            setUser(null)
            return null
        }
    }

    const logOut = () => {
        if (user !== null) {
            app.currentUser!.logOut()
            setUser(null)
        }
    }

    return (
        <RealmAppContext.Provider
            value={{
                logIn,
                logOut,
                user,
            }}
        >
            {children}
        </RealmAppContext.Provider>
    )
}

export const useRealmApp = () => {
    const realmContext = useContext(RealmAppContext)
    if (realmContext == null) {
        throw new Error("useRealmApp() called outside of a RealmApp?")
    }
    return realmContext
}

export default RealmApp