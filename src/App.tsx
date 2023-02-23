import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar, Window, WindowActionsEvent } from '@progress/kendo-react-dialogs';
import { Grid, GridColumn } from '@progress/kendo-react-grid';
import { AppBar, AppBarSection, AppBarSpacer, Menu, MenuSelectEvent, StackLayout, TileLayout, TileLayoutItem, TileLayoutRepositionEvent } from '@progress/kendo-react-layout';
import { useCallback, useEffect, useState } from 'react';
import './App.scss';
import { useMongoDB } from './MongoDB';
import { useRealmApp } from './RealmApp';

function App() {
  // testing realm
  const { logIn, logOut, user } = useRealmApp()
  const { db } = useMongoDB()

  useEffect(() => {
    logIn()
  }, [])

  const [publicEmployers, setPublicEmployers] = useState([])
  const getPublicEmployers = async () => {
    const publicEmployers = await db.collection("public_employers").find()
    setPublicEmployers(publicEmployers)
  }

  useEffect(() => {
    if (user && db) {
      getPublicEmployers()
      let tt = testTiles
      tt = tt.map((tile: any) => {
        tile.id = tile.id + Math.random()
        return tile
      })
      setTestTiles((prevTiles) => tt)
      console.log(testTiles)
    }
  }, [user, db])

  // custom user data
  const [positions, setPositions] = useState<Array<any>>([
    { col: 1, colSpan: 1, rowSpan: 2 },
    { col: 2, colSpan: 1, rowSpan: 2 },
    { col: 3, colSpan: 1, rowSpan: 2 },
    { col: 1, colSpan: 1, rowSpan: 2 },
    { col: 2, colSpan: 1, rowSpan: 2 },
    { col: 3, colSpan: 1, rowSpan: 2 },
    { col: 1, colSpan: 1, rowSpan: 2 },
    { col: 2, colSpan: 1, rowSpan: 2 },
    { col: 3, colSpan: 1, rowSpan: 2 },
    { col: 1, colSpan: 1, rowSpan: 2 },
    { col: 2, colSpan: 1, rowSpan: 2 },
    { col: 3, colSpan: 1, rowSpan: 2 },
  ])

  const TestGrid = () => {
    return (
      <Grid data={publicEmployers}>
        <GridColumn field="description" title="Bezeichnung" />
        <GridColumn field="postal_code" title="PLZ" />
        <GridColumn field="location" title="Ort" />
      </Grid>
    );
  }

  // custom user data
  const [tilesAvailable, setTilesAvailable] = useState<any>([
    {
      id: "public_employer",
      name: "AG Öffentlich",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            AG Öffentlich
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="fullscreen"
              onClick={() => {
                addWindow("test_grid_" + Math.random(), "TestGrid", TestGrid())
              }}
              size="small"
            />
          </AppBarSection>

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("public_employer")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <TestGrid />

          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>

              <AppBarSection>
                <Button icon="add" size="small" onClick={() => alert("AG öffentlich erstellen")} />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "private_employer",
      name: "AG Privat",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            AG Privat
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("private_employer")}
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>

              <AppBarSection>
                <Button icon="add" size="small" onClick={() => alert("AG privat erstellen")} />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "employee",
      name: "Jugendliche*r",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Jugendliche*r
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("employee")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>

              <AppBarSection>
                <Button icon="add" size="small" onClick={() => alert("Jugendliche*r erstellen")} />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "job",
      name: "Job",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Job
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("job")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "job_unassigned",
      name: "Job (nicht zugeteilt)",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Job (nicht zugeteilt)
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("job_unassigned")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "worklog",
      name: "Arbeitseinsatz",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Arbeitseinsatz
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("worklog")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "invoice",
      name: "Rechnung",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Rechnung
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("invoice")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "note",
      name: "Notiz",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Notiz
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("note")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>

              <AppBarSection>
                <Button icon="add" size="small" onClick={() => alert("Notiz erstellen")} />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "to_do",
      name: "Zu erledigen",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Zu erledigen
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("to_do")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "receipt",
      name: "Quittung",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Quittung
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("receipt")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "document",
      name: "Dokument",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Dokument (intern)
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("document")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    },
    {
      id: "tag",
      name: "Tag",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            Tag
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("tag")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    }
  ])

  // custom user data
  const [tiles, setTiles] = useState<any>()

  // changestream action
  const removeTile = useCallback((tileId: string) => {
    let futureTiles = tilesAvailable
    futureTiles = futureTiles.map((tile: any) => {
      if (tile.id === tileId || tile.hide) {
        tile.hide = true
        return tile
      } else {
        tile.hide = false
        return tile
      }
    })
    setTilesAvailable(futureTiles)
  }, [tilesAvailable]);

  // changestream action
  const addTile = useCallback((tileId: string) => {
    let futureTiles = tilesAvailable
    futureTiles = futureTiles.map((tile: any) => {
      if (tile.id === tileId || tile.hide === false) {
        tile.hide = false
        return tile
      } else {
        return tile
      }
    })
    setTilesAvailable(futureTiles)
  }, [tilesAvailable]);

  // set tiles accordingly once after loading
  useEffect(() => {
    setTiles(tilesAvailable.filter((tile: any) => !tile.hide))
  }, [tilesAvailable])

  // local action
  const [showDialog, setShowDialog] = useState<any>(
    {
      functionIsDeprecated: false
    }
  )

  // custom user data
  const [windows, setWindows] = useState<any>(
    {
      search: {
        show: false,
        top: window.innerHeight / 4,
        left: window.innerWidth / 4,
        height: 500,
        width: 750
      }
    }
  )

  const [customWindows, setCustomWindows] = useState<any[]>([])

  // changestream action
  // callback-hook needed?
  const addWindow = useCallback((id: string, title: string, content: any) => {
    setCustomWindows((prevWindows: any) => [...prevWindows, {
      id: id,
      title: title,
      content: content,
      initialTop: window.innerHeight / 4,
      top: 0,
      initialLeft: window.innerWidth / 4,
      left: 0,
      initialHeight: 500,
      height: 500,
      initialWidth: 750,
      width: 750
    }])
  }, [customWindows])

  // changestream action
  const removeWindow = useCallback((id: string) => {
    let futureCustomWindows = customWindows
    futureCustomWindows = futureCustomWindows.filter((window: any) => window.id !== id)
    setCustomWindows(futureCustomWindows)
  }, [customWindows])

  // platform data
  const [tilesMenuItems, setTilesMenuItems] = useState<any>()

  useEffect(() => {
    setTilesMenuItems(tilesAvailable.map((tile: any) => {
      if (tile.hide) {
        return { text: tile.name, icon: "" }
      } else {
        return { text: tile.name, icon: "check", disabled: true }
      }
    }))
  }, [tilesAvailable, tiles])

  interface Tile extends TileLayoutItem {
    id?: string,
    name?: string
  }

  const [testTiles, setTestTiles] = useState<Tile[]>([
    {
      id: "public_employer",
      name: "AG Öffentlich",
      header: <>
        <AppBar style={{ background: "white" }}>
          <AppBarSection>
            AG Öffentlich
          </AppBarSection>

          <AppBarSpacer />

          <AppBarSection>
            <Button
              icon="fullscreen"
              onClick={() => {
                addWindow("test_grid_" + Math.random(), "TestGrid", TestGrid())
              }}
              size="small"
            />
          </AppBarSection>

          <AppBarSection>
            <Button
              icon="close"
              onClick={() => removeTile("public_employer")}
              size="small"
            />
          </AppBarSection>
        </AppBar>
      </>,
      body: <>
        <StackLayout orientation="vertical" style={{ height: "100%" }}>
          <TestGrid />

          <StackLayout align={{ vertical: "bottom" }}>
            <AppBar style={{ background: "white" }}>
              <AppBarSection>
                <Button
                  icon="reload"
                  size="small"
                  onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: true })}
                />
              </AppBarSection>

              <AppBarSection>
                <Button icon="add" size="small" onClick={() => alert("AG öffentlich erstellen")} />
              </AppBarSection>
            </AppBar>
          </StackLayout>
        </StackLayout>
      </>
    }
  ])

  return (
    <>
      {
        showDialog.functionIsDeprecated &&
        <Dialog title="Hinweis">
          <div style={{ maxWidth: 300 }}>
            Die Funktion wird nicht mehr unterstützt.
          </div>
          <DialogActionsBar>
            <div style={{ textAlign: "right" }}>
              <Button
                onClick={() => setShowDialog({ ...showDialog, functionIsDeprecated: false })}
              >
                Alles klar!
              </Button>
            </div>
          </DialogActionsBar>
        </Dialog>
      }

      {/* hard coded window example */}
      {
        windows.search.show && (
          <Window
            title="Suche"
            onClose={() => setWindows({ ...windows, search: { ...windows.search, show: false } })}
            onStageChange={(e: WindowActionsEvent) => {
              switch (e.state) {
                case "MINIMIZED":
                  setWindows({
                    ...windows, search: {
                      ...windows.search,
                      top: window.innerHeight - 75,
                      left: 1,
                      height: 75,
                      width: 300
                    }
                  })
                  break;
                case "DEFAULT":
                  setWindows({
                    ...windows,
                    search: {
                      ...windows.search,
                      top: window.innerHeight / 4,
                      left: window.innerWidth / 4,
                      height: 500,
                      width: 750
                    }
                  })
                  break;
                case "FULLSCREEN":
                  setWindows({
                    ...windows,
                    search: {
                      ...windows.search,
                      top: 0,
                      left: 0
                    }
                  })
                  break;
                default:
                  break;
              }
            }}
            top={windows.search.top}
            left={windows.search.left}
            height={windows.search.height}
            width={windows.search.width}
            draggable={false}
          >
            Suche
          </Window>
        )
      }

      {/* dynamicly added window example */}
      {
        customWindows.map((customWindow: any) => {
          return (
            <Window
              key={customWindow.id}
              title={customWindow.title}
              onClose={() => removeWindow(customWindow.id)}
              onStageChange={(e: WindowActionsEvent) => {
                switch (e.state) {
                  case "MINIMIZED":
                    setCustomWindows(customWindows.map((customWindow: any) => {
                      if (customWindow.id === customWindow.id) {
                        customWindow.top = window.innerHeight - 75
                        customWindow.left = 1
                        customWindow.width = 300
                        return customWindow
                      }
                      return customWindow
                    }))
                    break;
                  case "DEFAULT":
                    setCustomWindows(customWindows.map((customWindow: any) => {
                      if (customWindow.id === customWindow.id) {
                        customWindow.top = customWindow.initialTop
                        customWindow.left = customWindow.initialLeft
                        customWindow.width = customWindow.initialWidth
                        return customWindow
                      }
                      return customWindow
                    }))
                    break;
                  default:
                    break;
                }
              }}
              initialTop={customWindow.initialTop}
              top={customWindow.top}
              initialLeft={customWindow.initialLeft}
              left={customWindow.left}
              initialHeight={customWindow.initialHeight}
              height={customWindow.height}
              initialWidth={customWindow.initialWidth}
              width={customWindow.width}
              draggable
              resizable
            >
              {customWindow.content}
            </Window>
          )
        })
      }

      <StackLayout orientation="vertical" style={{ height: "100vh" }}>
        <StackLayout align={{ vertical: "top" }} style={{ maxHeight: "7vh" }}>
          <AppBar style={{ background: "#ffd23f" }}>
            <AppBarSection>
              <h3>jobfairy v3.0</h3>
            </AppBarSection>

            <AppBarSection>
              <Menu
                items={[
                  {
                    text: "Suche",
                    icon: "search",
                  },
                  {
                    text: "Neu",
                    icon: "add",
                    items: [
                      { text: "Notiz", icon: "paste-plain-text" },
                      { text: "Dokument", icon: "file" },
                      { text: "Auftraggeber*in (öffentlich)", icon: "user" },
                      { text: "Auftraggeber*in (privat)", icon: "user" },
                      { text: "Jugendliche*r", icon: "user" },
                    ]
                  },
                  { text: "Buchhaltung", icon: "calculator" },
                  { text: "Export", icon: "export", },
                  { text: "Fenster schliessen", icon: "close" },
                  {
                    text: "Kacheln",
                    icon: "eye",
                    items: tilesMenuItems
                  },
                ]}
                onSelect={(e: MenuSelectEvent) => {
                  switch (e.item.text) {
                    case "Suche":
                      setWindows({ ...windows, search: { ...windows.search, show: true } })
                      break;
                    case "Neue Notiz":
                      alert("Notiz")
                      break;
                    case "Neues Dokument":
                      alert("Dokument")
                      break;
                    case "Neue*r Auftraggeber*in (öffentlich)":
                      alert("Auftraggeber*in (öffentlich)")
                      break;
                    case "Neue*r Auftraggeber*in (privat)":
                      alert("Auftraggeber*in (privat)")
                      break;
                    case "Neue*r Jugendliche*r":
                      alert("Jugendliche*r")
                      break;
                    case "Buchhaltung":
                      alert("Buchhaltung")
                      break;
                    case "Export":
                      alert("Export")
                      break;
                    case "Fenster schliessen":
                      alert("Fenster schliessen")
                      break;
                    case "AG Öffentlich":
                      addTile("public_employer")
                      break;
                    case "AG Privat":
                      addTile("private_employer")
                      break;
                    case "Jugendliche*r":
                      addTile("employee")
                      break;
                    case "Job":
                      addTile("job")
                      break;
                    case "Job (nicht zugeteilt)":
                      addTile("job_unassigned")
                      break;
                    case "Arbeitseinsatz":
                      addTile("worklog")
                      break;
                    case "Rechnung":
                      addTile("invoice")
                      break;
                    case "Notiz":
                      addTile("note")
                      break;
                    case "Zu erledigen":
                      addTile("to_do")
                      break;
                    case "Quittung":
                      addTile("receipt")
                      break;
                    case "Dokument":
                      addTile("document")
                      break;
                    case "Tag":
                      addTile("tag")
                      break;

                    default:
                      break;
                  }
                }}
              />
            </AppBarSection>

            <AppBarSpacer />

            <AppBarSection>
              <Menu
                items={[
                  { text: "Zu erledigen", icon: "check" },
                  { text: "Verwaltung", icon: "user" },
                  { text: "Abmelden", icon: "logout" }
                ]}
                onSelect={(e: MenuSelectEvent) => {
                  switch (e.item.text) {
                    case "Abmelden":
                      alert("Abmelden")
                      break;

                    default:
                      break;
                  }
                }}
              />
            </AppBarSection>
          </AppBar>
        </StackLayout>

        <StackLayout orientation="vertical" style={{ minHeight: "88vh", overflow: "scroll" }}>
          <TileLayout
            columns={3}
            rowHeight={255}
            positions={positions}
            onReposition={(e: TileLayoutRepositionEvent) => setPositions(e.value)}
            // items={tiles}
            items={testTiles}
            autoFlow="row"
            dataItemKey="id"
          />
        </StackLayout>

        <StackLayout align={{ vertical: "bottom" }} style={{ maxHeight: "5vh" }}>
          <AppBar style={{ background: "white" }}>
            <AppBarSection>v3.0</AppBarSection>
          </AppBar>
        </StackLayout>
      </StackLayout>
    </>
  )
}

export default App;
