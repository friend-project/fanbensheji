import { useState, useEffect } from 'react'
import { CloseCircleOutlined } from '@ant-design/icons'
import { Input } from 'antd'

const { TextArea } = Input

export default ({
  data,
  onChange,
}) => {
  const [value, setValue] = useState('')

  useEffect(() => { setValue(data.data) }, [])

  useEffect(
    () => {
      onChange({
        ...data,
        data: value,
      })
    },
    [value],
  )


  return (
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-14px',
          right: '-14px',
          cursor: 'pointer',
        }}
        onClick={() => onChange({ ...data, handle: 'delete' })}
      >
        <CloseCircleOutlined />
      </div>
      <TextArea
        style={{
          height: 100,
          width: '100%',
          marginBottom: 24,
        }}
        value={value}
        onChange={({ target }) => setValue(target.value)}
        placeholder="请输入文字"
      />
    </div>
  )
}
