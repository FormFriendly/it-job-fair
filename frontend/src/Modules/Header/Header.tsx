import { useUser } from '@/Hooks/User/useUser';
import Logo from './Icons/Logo'
import {Avatar, Menu, MenuButton, MenuList, MenuItem, Button, Flex, Text} from '@chakra-ui/react';
import { useLogout } from '@/Hooks/User/useLogout';
import { useRouter } from 'next/router';
import Routes from '@/Routes/Routes';

const Header = () => {
    const {data: user} = useUser()
    const logout = useLogout()
    const router = useRouter()
    console.log(user, 'user')
    return (
        <Flex 
            alignItems={'center'} 
            padding={'24px 40px'} 
            border={'1px solid #E1E1E1'}
            justifyContent={'space-between'}>
            <Flex onClick={() => router.push(Routes.vacancies)}
                cursor={'pointer'}
                alignItems={'center'} 
                gap={'20px'}>
                <Logo />
                <Text 
                    fontSize={32} 
                    fontWeight={700}>
                    IT BAZAR
                </Text>
            </Flex>
            {
                user ?
                <Menu>
                    <MenuButton as={Button} rightIcon={<Avatar />}>
                        {user.name}
                    </MenuButton>
                    <MenuList>
                        <MenuItem onClick={() => router.push(Routes.profile.main) }>Профиль</MenuItem>
                        <MenuItem onClick={() => user.role === 'company' ? router.push(Routes.company.vacancies) : router.push(Routes.vacancies)}>Вакансии</MenuItem> {/* TODO в дальнейшем будет разделение доступных роутов для разных пользователей */}
                        <MenuItem onClick={() => logout()}>Выход</MenuItem>
                    </MenuList>
                </Menu>
                : <Button onClick={() => router.push(Routes.login)} >
                    Войти или зарегистрироваться
                </Button>
            }
        </Flex> 
    )
}

export default Header