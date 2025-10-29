import { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}
function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);

  async function fetchProjects() {
    try {
      const response = await fetch("http://localhost:3000/projects");
      const data = await response.json();
      setProjects(data.data);
      console.log("Projects fetched:", data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }
  function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
  // useEffect(() => {
  //   console.log("Test component mounted");
  //   function handleClick() {
  //     console.log("Test component clicked");
  //   }
  //   window.addEventListener("click", handleClick);
  //   return () => {
  //     window.removeEventListener("click", handleClick);
  //     console.log("Test component unmounted");
  //   };
  // }, []);
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="">
      <h2 className="mb-15 font-bold text-5xl">Projects</h2>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.length > 0 ? (
            projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.id}</TableCell>
                <TableCell>{project.name}</TableCell>

                <TableCell>
                  <Dialog>
                    <DialogTrigger className="border-solid  border-2 px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                      View Project
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Project Details</DialogTitle>
                        <DialogDescription>
                          Here are the details for project {project.id}.
                        </DialogDescription>
                        <p>Name: {project.name}</p>
                        <p>Description: {project.description}</p>
                        <p>Created At: {formatDate(project.createdAt)}</p>
                        <p>Updated At: {formatDate(project.updatedAt)}</p>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                No projects loaded yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
export default Dashboard;
