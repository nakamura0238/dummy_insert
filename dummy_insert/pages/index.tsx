import type { NextPage } from 'next'
import { useState, useEffect } from 'react' 
import { css } from '@emotion/react'


const Home: NextPage = () => {
  const [tableName, setTableName] = useState("")
  const [tableError, setTableError] = useState(false)
  const [addCount, setAddCount] = useState("1")
  const [addCountError, setAddCountError] = useState(false)
  let [columns, setColumn] = useState(
    [
      {
        column: "",
        data: "",
        colError: false,
        dataError: false
      }
    ]
  )
  const [first, setFirst] = useState("INSERT \nINTO [table]")
  const [second, setSecond] = useState("\n  ([column])")
  const [secondItem, setSecondItem] = useState<string[]>([])
  const [third, setThird] = useState("\nVALUES \n  (['data']);")
  const [thirdItem, setThirdItem] = useState<string[]>([])


  // テーブル名の設定
  const onChangeTableName = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 半角英数字、ハイフン、アンダースコア
    if (/^[0-9a-zA-Z-_]+$/.test(event.currentTarget.value)) {
      setTableError(false)
      setFirst("INSERT \nINTO " + event.currentTarget.value)
    } else {
      if (event.currentTarget.value) {
        setTableError(true)
      } else {
        setTableError(false)
        setFirst("INSERT \nINTO [table]")
      }
    }
    setTableName(event.currentTarget.value)
  }

  // 追加レコード数の設定
  const onChangeAddCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 半角数字のみ
    if (/^[0-9]+$/.test(event.currentTarget.value)) {
      setAddCountError(false)
    } else {
      setAddCountError(true)
    }
    setAddCount(event.currentTarget.value)
  }

  // カラム名の設定
  const onChangeColumn = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // 半角英数字、ハイフン、アンダースコア
    if (/^[0-9a-zA-Z-_]+$/.test(event.currentTarget.value)) {
      columns[index].colError = false
    } else {
      columns[index].colError = true
    }
    columns[index].column = event.currentTarget.value
    setColumn([...columns])
  }

  // データの設定
  const onChangeDataName = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // if (/^\S+$/.test(event.target.value)) {
    //   columns[index].dataError = false
    // }else {
    //   columns[index].dataError = true
    // }
    columns[index].data = event.currentTarget.value
    setColumn([...columns])
  }

  // カラムの追加
  const addColumn = () => {
    const addItem = {column: "", data: "", colError: false, dataError:false}
    setColumn([...columns, addItem])
  }

  // カラムのフォームのリセット
  const resetAction = () => {
    setColumn(
      [
        {
          column: "",
          data: "",
          colError: false,
          dataError: false
        }
      ]
    )
    setSecond("\n  ([column])")
    setSecondItem([])
    setThird("\nVALUES \n  (['data'])")
    setThirdItem([])
  }

  // ページ全体のリセット
  const allReset = () => {
    setTableName("")
    setTableError(false)
    setAddCount("1")
    setAddCountError(false)
    setColumn(
      [
        {
          column: "",
          data: "",
          colError: false,
          dataError: false
        }
      ]
    )
    setFirst("INSERT \nINTO [table]")
    setSecond("\n  ([column])")
    setSecondItem([])
    setThird("\nVALUES \n  (['data'])")
    setThirdItem([])
  }

  useEffect(() => {
    let tmpSecond: string[] = []
    let tmpThird: string[] = []
    columns.map(item => {
      if (item.column && !item.colError /* && item.data && !item.dataError */) {
        tmpSecond.push(item.column)
        tmpThird.push(item.data)
      }
    })
    setSecondItem(tmpSecond)
    setThirdItem(tmpThird)
  }, [columns])

  useEffect(() => {
    let secondSql = "\n  ("
    let thirdSql = "\nVALUES\n  ("

    if (secondItem.length > 0 /* && thirdItem.length > 0 */) {
      secondItem.map(item => {
        secondSql = secondSql + item + "\n  , "
      })
      secondSql = secondSql.slice(0, -5) + ")"

      if (Number(addCount) > 1) {
        for (let i = 1; i <= Number(addCount); i++) {
          thirdItem.map(item => {
            if (item.toUpperCase() != "NULL") {
              thirdSql = thirdSql + "'" + (item + i) + "', "
            } else {
              thirdSql = thirdSql + "NULL" + ", "
            }
          })
          thirdSql = thirdSql.slice(0, -2) + ")\n  ,("
        }
        thirdSql = thirdSql.slice(0, -5)
      } else {
        thirdItem.map(item => {
          if (item.toUpperCase() != "NULL") {
            thirdSql = thirdSql + "'" + item + "'\n  , "
          } else {
            thirdSql = thirdSql + "NULL" + "\n  , "
          }
        })
        thirdSql = thirdSql.slice(0, -5) + ")"
      }
    }else {
      secondSql = secondSql + "[column])"
      thirdSql = thirdSql + "['data'])"
    }

    thirdSql = thirdSql + ";"

    setSecond(secondSql)
    setThird(thirdSql)

  }, [addCount, secondItem, thirdItem])

  const returnStyle = (flg: boolean) => {
    // switch (tag) {
    //   case "col":
    //     return flg ? [formStyle, formItemError]: formStyle;
    //   // case "data":
    //   //   return columns[index].dataError ? [bottomFormItemStyle, formItemError]: bottomFormItemStyle;
    // }
    return flg ? [formStyle, formItemError]: formStyle;
  }

  return (
    <>
      <div css={infoArea}>
        <h1>ダミーINSERT</h1>
        <p>ダミーデータを挿入するためのSQL文を生成するサービスです。</p>
        <p>複数レコード追加する場合には、データの後ろに番号が付与されます。</p>
        <p>NULLはデータに「null」を入力することで設定できます。</p>
      </div>
      <div css={container}>
        <div css={formArea}>
          <div css={topFormArea}>
            <div css={topFormItem}>
              <label htmlFor='tableName'><span>テーブル名</span></label>
              <input id='tableName' css={returnStyle(tableError)} type="text" value={tableName} onChange={onChangeTableName} autoComplete="off" />
              <p css={errorMessage}>{tableError ? "半角英数字で入力してください" : ""}</p>
            </div>
            <div css={topFormItem}>
              <label htmlFor='addCount'><span>追加レコード数</span></label>
              <input id='addCount' css={returnStyle(addCountError)} type="number" min="1" value={addCount} onChange={onChangeAddCount} autoComplete="off"/>
              <p css={errorMessage}>{addCountError ? "半角数字で入力してください" : ""}</p>
            </div>
          </div>

          <div css={bottomFormArea}>
            <div css={buttonBox}>
              <button css={addColumnButton} onClick={addColumn}>＋ カラム追加</button>
              <button css={resetColumnButton} onClick={resetAction}>リセット</button>
            </div>
            <div css={formScroll}>
              {
                columns.map((item, index) => {
                  return (
                    <div key={index} css={bottomFormItem}>
                      <p>{index + 1}</p>
                      <div css={bottomFormItemInner}>
                        <div>
                          <input type="text" value={item.column} onChange={e => onChangeColumn(e, index)} autoComplete="off" placeholder="カラム名" css={returnStyle(columns[index].colError)}/>
                        </div>
                        <div>
                          <input type="text" value={item.data} onChange={e => onChangeDataName(e, index)} autoComplete="off" placeholder="データ" css={formStyle}/>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>

        <div css={exportArea}>
          <label htmlFor='exportArea'><span css={css`display: inline-block; line-height: 1.8rem;`}>SQL文</span></label>
          <textarea id='exportArea' css={css`width: 100%;`} onClick={event => {event.currentTarget.select()}} value={first + second + third} readOnly>
            
          </textarea>
        </div>
      </div>
    </>
  )
}

export default Home

const container = css`
  display: flex;
  flex-direction: row;
  min-width: 700px;
  padding-bottom: 30px;
`

const infoArea = css`
  padding: 20px 0;
  h1 {
    padding-bottom: 20px;
    font-size: 2.5rem;
  }
  p {
    padding-left: 1rem;
    line-height: 1.4rem;
  }
`

const formArea = css`
  display: flex;
  flex-direction: column;
  width: 60%;
`

const topFormArea = css`
  display: flex;
  flex-direction: row;
`

const topFormItem = css`
  display: flex;
  flex-direction: column;
  width: 50%;
  padding: 10px;
  span {
    display: inline-block;
    line-height: 1.8rem;
  }
`

const bottomFormArea = css`
  display: flex;
  flex-direction: column;
  border: 2px solid #dddddd;
  border-radius: 5px;
`

const buttonBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 20%;
  border-bottom: 2px solid #dddddd;
  /* margin-bottom: 20px;
  button {
    padding: 5px;
    border: 2px solid #333333;
  } */
`

const addColumnButton = css`
  padding: 5px 10px;
  border: 2px solid #333333;
  border-radius: 3px;
  transition: 0.1s;
  &:hover {
    background-color: #333333;
    color: #ffffff;
  }
`

const resetColumnButton = css`
  padding: 5px 10px;
  border: 2px solid #cc0000;
  border-radius: 3px;
  background-color: #ffffff;
  color: #cc0000;
  transition: 0.1s;
  &:hover {
    background-color: #cc0000;
    color: #ffffff;
  }
`

const formScroll = css`
  height: 500px;
  min-height: calc(1.5rem + 35px);
  padding: 10px;
  overflow: auto;
  resize: vertical;
`

const bottomFormItem = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;
  p {
    width: 50px;
    text-align: center;
  }
`

const bottomFormItemInner = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: calc(100% - 50px);
  div {
    width: 50%;
    padding: 0 10px;
  }
`

const formItemError = css`
  border-color: red;
  background-color: #ffeeee;
  color: red;
`

const formStyle = css`
  display: block;
  width: 100%;
  padding: 5px 10px;
  border: 2px solid #333333;
  border-radius: 3px;
`
const errorMessage = css`
  height: 1.5rem;
  font-size: 12px;
  line-height: 1.5rem;
  color: red;
`

const exportArea = css`
  width: 40%;
  margin-left: 40px;
  padding-top: 10px;
  resize: none;
  textarea {
    width: 100%;
    height: calc(100% - 1.8rem);
    padding: 10px;
    border: 2px solid #333333;
    border-radius: 5px;
    font-family: 'Source Code Pro', monospace;
    line-height: 1.3rem;
    resize: vertical;
  }
`