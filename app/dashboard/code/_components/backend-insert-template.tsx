import React, { memo } from 'react';
import { CodeHighlight } from '@mantine/code-highlight';
import { useForm } from '@mantine/form';
import { TextInput, Group, ActionIcon, Box, Text, Button, Select } from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { IconTrash } from '@tabler/icons-react';

const BackendTemplate = memo((props: { data: any; useAuth: boolean }) => {
  const { data, useAuth } = props;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: 'name', type: 'String', key: randomId() }],
    },
  });

  const fields = form.getValues().employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="参数名称"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(`employees.${index}.name`)}
        {...form.getInputProps(`employees.${index}.name`)}
      />
      <Select
        placeholder="参数类型"
        data={['String', 'Number']}
        key={form.key(`employees.${index}.type`)}
        {...form.getInputProps(`employees.${index}.type`)}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  ));

  const name = data.templateName.toLowerCase();

  // 动态生成代码
  const generateExampleCode = () => {
    const employees = form.getValues().employees;
    const parameters = employees
      .map((item) => `        ${item.name}: ${item.type}(body.${item.name})`)
      .join(',\n'); // 使用 join 避免多余逗号

    return `
import { NextRequest } from "next/server";
import { useServerTool } from "~@/utils/useServerTool";
import prisma from "~@/utils/usePrisma";
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  useServerTool.setRequest(request);

${
  useAuth
    ? `  const cookieStore = await cookies();`
    : ''
}

  try {
${
  useAuth
    ? `
    const user = await useServerTool.useAuth();

    if (!user) {
      cookieStore.delete('token');
      return useServerTool.responseError({
        message: "未登录",
        status: 401,
      });
    }
  `
    : ''
}

    const body = <any>await useServerTool.getBody();

    if (Object.keys(body).length === 0) {
      return useServerTool.responseError({
        message: "参数错误",
      });
    }

    const ${name} = await prisma.${name}.create({
      data: {
${parameters}
      },
    });

    if (!${name}) {
      return useServerTool.responseError({
        message: "创建失败",
      });
    }

    return useServerTool.responseSuccess({
      message: "创建成功",
    });
  } catch (error) {
    return useServerTool.responseError({
      message: "系统错误",
      status: 500,
    });
  }
}
`;
  };

  return (
    <div className="flex">
      <CodeHighlight
        code={`// 新增数据 POST${generateExampleCode()}`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        className="flex-1"
      />
      <div className="w-96 border-l bg-white p-4">
        <div className="font-bold text-lg mb-4">请求参数设置</div>
        <Box maw={500} mx="auto">
          {fields.length > 0 ? (
            <Group mb="xs">
              <Text fw={500} size="sm">
                参数名称
              </Text>
              <Text fw={500} size="sm" pl={60}>
                参数类型
              </Text>
            </Group>
          ) : (
            <Text c="dimmed" ta="center">
              暂无参数
            </Text>
          )}

          {fields}

          <Group justify="center" mt="md">
            <Button
              onClick={() =>
                form.insertListItem('employees', { name: '', type: 'string', key: randomId() })
              }
            >
              新增参数
            </Button>
          </Group>
        </Box>
      </div>
    </div>
  );
});

BackendTemplate.displayName = 'BackendTemplate';

export default BackendTemplate;
