import type { NextPage } from 'next'
import Head from 'next/head'
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


  const onChangeTableName = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9a-zA-Z-_]+$/.test(event.target.value)) {
      setTableError(false)
      setFirst("INSERT \nINTO " + event.target.value)
    } else {
      if (event.target.value) {
        setTableError(true)
      } else {
        setTableError(false)
        setFirst("INSERT \nINTO [table]")
      }
    }
    setTableName(event.target.value)
  }

  const onChangeAddCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]+$/.test(event.target.value)) {
      setAddCountError(false)
    } else {
      setAddCountError(true)
    }
    setAddCount(event.target.value)
  }

  const onChangeColumn = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (/^[0-9a-zA-Z-_]+$/.test(event.target.value)) {
      columns[index].colError = false
    } else {
      columns[index].colError = true
    }
    columns[index].column = event.target.value
    setColumn([...columns])
  }

  const onChangeDataName = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    // if (/^\S+$/.test(event.target.value)) {
    //   columns[index].dataError = false
    // }else {
    //   columns[index].dataError = true
    // }
    columns[index].data = event.target.value
    setColumn([...columns])
  }

  const addColumn = () => {
    const addItem = {column: "", data: "", colError: false, dataError:false}
    setColumn([...columns, addItem])
  }

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
            thirdSql = thirdSql + "'" + (item + i) + "', "
          })
          thirdSql = thirdSql.slice(0, -2) + ")\n  ,("
        }
        thirdSql = thirdSql.slice(0, -2)
      } else {
        thirdItem.map(item => {
          thirdSql = thirdSql + "'" + item + "'\n  , "
        })
        thirdSql = thirdSql.slice(0, -5) + ")"
      }
    }else {
      secondSql = secondSql + "[column])"
      thirdSql = thirdSql + "['data'])"
    }

    thirdSql = thirdSql.slice(0, -3) + ";"

    setSecond(secondSql)
    setThird(thirdSql)

  }, [addCount, secondItem, thirdItem])

  const returnStyle = (index: number, tag: String) => {
    switch (tag) {
      case "col":
        return columns[index].colError ? [bottomFormItemStyle, formItemError]: bottomFormItemStyle;
      // case "data":
      //   return columns[index].dataError ? [bottomFormItemStyle, formItemError]: bottomFormItemStyle;
    }

  }
  return (
    <div css={homeMount}>
      {/* <Head></Head> */}
      <div css={container}>
        <div css={formArea}>
          <div css={topFormArea}>
            <div css={topFormItem}>
              <label htmlFor='tableName'><span>テーブル名</span></label>
              <input id='tableName' css={formStyle} type="text" value={tableName} onChange={onChangeTableName} autoComplete="off" />
              <p css={errorMessage}>{tableError ? "半角英数字で入力してください" : ""}</p>
            </div>
            <div css={topFormItem}>
              <label htmlFor='addCount'><span>追加レコード数</span></label>
              <input id='addCount' css={formStyle} type="number" min="1" value={addCount} onChange={onChangeAddCount} autoComplete="off"/>
              <p css={errorMessage}>{addCountError ? "半角数字で入力してください" : ""}</p>
            </div>
          </div>

          <div css={bottomFormArea}>
            <div css={buttonBox}>
              <button onClick={addColumn}>カラム追加</button>
              <button onClick={resetAction}>カラムリセット</button>
            </div>
            <div css={bottomFormItemLabel}>
              <p>カラム名</p>
              <p>データ</p>
            </div>
            <div css={formScroll}>
              {
                columns.map((item, index) => {
                  return (
                    <div key={index} css={bottomFormItem}>
                      <p>{index + 1}</p>
                      <div css={bottomFormItemInner}>
                        <div>
                          <input type="text" value={item.column} onChange={e => onChangeColumn(e, index)} autoComplete="off" css={returnStyle(index, "col")}/>
                        </div>
                        <div>
                          <input type="text" value={item.data} onChange={e => onChangeDataName(e, index)} autoComplete="off" css={bottomFormItemStyle}/>
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
          <textarea id='exportArea' css={css`width: 100%;`} readOnly value={first + second + third}>
            
          </textarea>
        </div>
      </div>
    </div>
  )
}

export default Home

const homeMount = css`
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
`

const container = css`
  display: flex;
  flex-direction: row;
  min-width: 640px;
  min-height: 100vh;
  padding: 50px 0;
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
`

const buttonBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  button {
    padding: 5px;
    border: 2px solid #333333;
  }
`

const bottomFormItemLabel = css`
  display: flex;
  flex-direction: row;
  margin-left: 50px;
  p {
    width: 50%;
    text-align: center;
    line-height: 1.6rem;
  }
`

const formScroll = css`
  height: 600px;
  overflow: auto;
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

const bottomFormItemStyle = css`
  width: 100%;
  padding: 5px;
  border: 2px solid #333333;
`

const formItemError = css`
  border-color: red;
  background-color: #ffeeee;
`

const formStyle = css`
  display: block;
  width: 100%;
  padding: 5px;
  border: 2px solid #333333;
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
  padding: 10px;
  resize: none;
  textarea {
    width: 100%;
    min-height: 500px;
    padding: 10px;
    border: 2px solid #666666;
    line-height: 1.2rem;
    resize: vertical;
  }
`