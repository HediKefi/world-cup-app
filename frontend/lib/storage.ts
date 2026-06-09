'use client'

import { matchesApi, teamsApi, authApi } from './api'
import { matches as initialMatches, teams as initialTeams } from './data'

const STORAGE_KEY_AUTH_TOKEN = 'auth_token'

export async function initializeStorage() {
  // No initialization needed for API-based storage
  return
}

export async function getMatches(params?: { status?: string; group?: string }) {
  try {
    return await matchesApi.getAll(params)
  } catch (error) {
    console.error('Error fetching matches:', error)
    return initialMatches
  }
}

export async function getTeams(params?: { group?: string }) {
  try {
    return await teamsApi.getAll(params)
  } catch (error) {
    console.error('Error fetching teams:', error)
    return initialTeams
  }
}

export async function updateMatch(id: string, updates: any) {
  try {
    return await matchesApi.update(id, updates)
  } catch (error) {
    console.error('Error updating match:', error)
    throw error
  }
}

export async function createMatch(match: any) {
  try {
    return await matchesApi.create(match)
  } catch (error) {
    console.error('Error creating match:', error)
    throw error
  }
}

export async function deleteMatch(id: string) {
  try {
    return await matchesApi.delete(id)
  } catch (error) {
    console.error('Error deleting match:', error)
    throw error
  }
}

export async function updateTeam(id: string, updates: any) {
  try {
    return await teamsApi.update(id, updates)
  } catch (error) {
    console.error('Error updating team:', error)
    throw error
  }
}

export function setAdminSession(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_AUTH_TOKEN, token)
  }
}

export function getAdminSession() {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(STORAGE_KEY_AUTH_TOKEN)
}

export function clearAdminSession() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY_AUTH_TOKEN)
  }
}

export async function validateAdminCredentials(username: string, password: string) {
  try {
    const response = await authApi.login(username, password)
    return response
  } catch (error) {
    console.error('Login error:', error)
    return null
  }
}
