import {
  useState,
  useEffect,
  Fragment,
} from 'react'
import { Button, Space } from 'antd'
import _ from 'lodash'

import Upload from './upload'
import Text from './text'

export default ({
  style,
  onChange,
  data,
}) => {
  const [value, setValue] = useState([])

  useEffect(() => { onChange(value) }, [value])
  useEffect(
    () => {
      setValue(data.map((v, i) => ({ ...v, id: i})))
    },
    [],
  )
  /*
  useEffect(() => {
    const newData = _.cloneDeep(value)
    newData.push({
      id: 1,
      type: 'pic',
      data: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-4',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-xxx',
          percent: 50,
          name: 'image.png',
          status: 'uploading',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        },
        {
          uid: '-5',
          name: 'image.png',
          status: 'error',
        },
      ],
    })
    newData.push({
      id: 2,
      type: 'text',
      data: 'nnnnnnnn',
    })
    setValue(newData)
  }, [])
  */

  const add = (type) => {
    const newData = _.cloneDeep(value)
    newData.push({
      id: Date.now(),
      type,
      data: [],
    })
    setValue(newData)
  }

  const handleChange = (v) => {
    const copyData = _.cloneDeep(value)
    if (v?.handle === 'delete') {
      _.remove(
        copyData,
        (n) => {
          return n.id === v.id
        },
      )
      setValue(copyData)
    } else {
      copyData[copyData.lastIndexOf(copyData.find(m => m.id === v.id))].data = v.data
      setValue(copyData)
    }
  }

  return (
    <div
      style={style}
    >
      {
        value.map(
          (v) => v.type === 'pic'
            ? (
              <Fragment
                key={v.id}
              >
                <Upload
                  data={v}
                  onChange={(m) => handleChange(m)}
                />
              </Fragment>
            ) : (
              <Fragment
                key={v.id}
              >
                <Text
                  data={v}
                  onChange={(m) => handleChange(m)}
                />
              </Fragment>
            )
        )
      }
      <Space>
        <Button
          onClick={() => add('pic')}
        >
          添加图片
        </Button>
        <Button
          onClick={() => add('text')}
        >
          添加文字
        </Button>
      </Space>
    </div>
  )
}
