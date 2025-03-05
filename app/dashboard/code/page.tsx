'use client'

import { useDisclosure } from '@mantine/hooks'
import { Modal, Button, Table, SegmentedControl } from '@mantine/core'
import React, { memo, useEffect, useState } from 'react'
import { getDatabaseTableColumns, getDatabaseTables } from '~/services/code'
import ControlUI from './_components/control-ui'
import ControlBackend from './_components/control-backend'
import ControlFrontend from './_components/control-frontend'

const page = memo(() => {
  const [opened, { open, close }] = useDisclosure(false)
  const [tables, setTables] = useState([])
  const [columns, setColumns] = useState({}) as any
  const [control, setControl] = useState('ui')

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const result = await getDatabaseTables()
        setTables(result.data)
      } catch (error) {
        console.error('获取表失败', error)
      }
    }

    fetchTables()
  }, [])

  const selectTable = (name: string) => {
    getDatabaseTableColumns(name).then(res => {
      const data = {
        data: res.data,
        templateName: name
      } as any
      setColumns(data)
    })
    close()
  }

  const tableRows = tables.map((item: any) => {
    return (
      <Table.Tr key={item.table_name}>
        <Table.Td>{item.table_name}</Table.Td>
        <Table.Td width={'100px'}>
          <Button onClick={() => selectTable(item.table_name)} variant="light">
            选择表
          </Button>
        </Table.Td>
      </Table.Tr>
    )
  })

  const renderControl = () => {
    return (
      <>
        <div className="main mt-4">
          <SegmentedControl
            value={control}
            onChange={setControl}
            data={[
              { label: 'FrontEnd UI', value: 'ui' },
              { label: 'FrontEnd API', value: 'frontend' },
              { label: 'BackEnd API', value: 'backend' }
            ]}
          />

          <div className="table-container">
            {control === 'ui' && <ControlUI data={columns} />}
            {control === 'backend' && <ControlBackend data={columns} />}
            {control === 'frontend' && <ControlFrontend data={columns} />}
          </div>
        </div>
      </>
    )
  }

  return (
    <div>
      <div className="header">
        <Button onClick={open}>选择数据表</Button>
      </div>
      {columns.templateName && (
        <h1 className="my-4 text-lg font-bold">{columns.templateName}</h1>
      )}
      {
        // columns.length > 0 ? renderControl() : '请选择数据表'
        columns.data ? renderControl() : '请选择数据表'
      }
      <Modal
        opened={opened}
        onClose={close}
        title="选择数据表"
        centered
        size={'md'}
      >
        <Table striped>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>数据表</Table.Th>
              <Table.Th>操作</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{tableRows}</Table.Tbody>
        </Table>
      </Modal>
    </div>
  )
})

page.displayName = 'code'

export default page
