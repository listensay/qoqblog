import React, { memo, useState } from 'react'
import {
  IconTrashXFilled,
  IconDatabasePlus,
  IconEditCircle,
  IconZoomExclamationFilled,
  IconClipboardListFilled
} from '@tabler/icons-react'
import BackendSelectTemplate from './backend-select-template'
import BackendInsertTemplate from './backend-insert-template'
import { Tabs } from '@mantine/core'
import { Checkbox } from '@mantine/core'

const backend = memo((props: { data: any }) => {
  const { data } = props
  const [useAuth, setUseAuth] = useState(true)

  return (
    <div className="mt-4">
      <div className="bg-white border rounded-md p-4 mb-4">
        <div className="text-lg font-bold mb-4">请求设置</div>
        <Checkbox
          defaultChecked
          label="需要用户验证"
          color="red"
          onChange={e => {
            setUseAuth(e.currentTarget.checked)
          }}
        />
      </div>
      <Tabs
        defaultValue="query"
        orientation="vertical"
        color="violet"
        className="border"
      >
        <Tabs.List>
          <Tabs.Tab value="insert" leftSection={<IconDatabasePlus size={12} />}>
            添加数据
          </Tabs.Tab>
          <Tabs.Tab value="delete" leftSection={<IconTrashXFilled size={12} />}>
            删除数据
          </Tabs.Tab>
          <Tabs.Tab value="update" leftSection={<IconEditCircle size={12} />}>
            修改数据
          </Tabs.Tab>
          <Tabs.Tab
            value="select"
            leftSection={<IconClipboardListFilled size={12} />}
          >
            查询数据
          </Tabs.Tab>
          <Tabs.Tab
            value="query"
            leftSection={<IconZoomExclamationFilled size={12} />}
          >
            数据详情
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="insert">
          <BackendInsertTemplate data={data} useAuth={useAuth} />
        </Tabs.Panel>

        <Tabs.Panel value="delete">
          {/* <BackendTemplate data={data} useAuth={ useAuth } /> */}
          删除
        </Tabs.Panel>

        <Tabs.Panel value="update">
          {/* <BackendTemplate data={data} useAuth={ useAuth } /> */}
          修改
        </Tabs.Panel>

        <Tabs.Panel value="query">
          {/* <BackendTemplate data={data} useAuth={ useAuth } /> */}
          数据详情
        </Tabs.Panel>

        <Tabs.Panel value="select">
          <BackendSelectTemplate data={data} useAuth={useAuth} />
        </Tabs.Panel>
      </Tabs>
    </div>
  )
})

backend.displayName = 'backend'

export default backend
