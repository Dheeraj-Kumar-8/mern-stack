import React, { useState, useEffect } from 'react';
import { Container, Stack, Avatar, Text, Loader, Center, Alert } from '@mantine/core';
import Service from '../../utils/http';
import { USER_PROFILE } from '../../utils/urls';

export default function ProfilePage() {
    const service = new Service();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await service.get('api/user/me');
            console.log('Profile response:', response);
            const userData = response.data || response;
            setUser(userData);
        } catch (err) {
            console.error('Error fetching user:', err);
            setError(err.response?.data?.message || 'Failed to fetch user profile');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) {
        return (
            <Container>
                <Center h={300}>
                    <Loader />
                </Center>
            </Container>
        );
    }

    if (error || !user) {
        return (
            <Container>
                <Center h={300}>
                    <Alert title="Error" color="red">
                        {error || 'User not found'}
                    </Alert>
                </Center>
            </Container>
        );
    }

    return (
        <Container>
            <Stack
                h="auto"
                bg="var(--mantine-color-body)"
                align="center"
                justify="center"
                gap="lg"
                py="xl"
            >
                <Avatar src={user.avatar} size={150} radius={150} alt={user.name} />
                
                <Stack gap="md" align="center" style={{ minWidth: '300px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <Text fw={500} size="sm" c="dimmed">Name:</Text>
                        <Text fw={500} size="lg">{user.name || 'N/A'}</Text>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <Text fw={500} size="sm" c="dimmed">Email id:</Text>
                        <Text c="dimmed">{user.email || 'N/A'}</Text>
                    </div>
                    
                    <div style={{ textAlign: 'center' }}>
                        <Text fw={500} size="sm" c="dimmed">Date Joined:</Text>
                        <Text c="dimmed" size="sm">
                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                        </Text>
                    </div>
                </Stack>
            </Stack>
        </Container>
    );
}