'use client'

export function saveGroupName(name: string) {
    console.log(name)
    localStorage.setItem("groupName", name);
}

export function getGroupName() {
    const name = localStorage.getItem("groupName")
    console.log(name)
    return name
}

export function deleteGroupName() {
    localStorage.removeItem("groupName")
}