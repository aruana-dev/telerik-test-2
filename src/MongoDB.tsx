import React, { useContext, useEffect, useState } from "react"
import { useRealmApp } from "./RealmApp"

const MongoDBContext = React.createContext<any>(null)

const MongoDB = ({ children }: any) => {
    const { user }: any = useRealmApp()
    const [db, setDb] = useState(null)

    useEffect(() => {
        if (user !== null) {
            const realmService = user.mongoClient("mongodb-atlas")
            setDb(realmService.db("aruana-jobfairy-demo-db"))
        }
    }, [user])

    return (
        <MongoDBContext.Provider
            value={{
                db,
            }}
        >
            {children}
        </MongoDBContext.Provider>
    )
}

export const useMongoDB = () => {
    const mdbContext = useContext(MongoDBContext)
    if (mdbContext == null) {
        throw new Error("useMongoDB() called outside of a MongoDB?")
    }
    return mdbContext
}

export default MongoDB