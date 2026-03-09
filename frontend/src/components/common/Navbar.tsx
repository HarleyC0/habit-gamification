import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { X, Menu } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "../ui/dropdown-menu";

function Navbar() {

    // estado menu para mobile
    const [ isMenuOpen, setIsMenuOpen ] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        navigate("/login");
    };

    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/** Logo*/}
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold text-gray-800">
                        🎮 Habit Gamification
                    </h1>
                </div>

                {/** Opciones */}
                <div className="hidden lg:flex">
                    <Link to="/habits">Hábitos</Link>
                    <Link to="/habits">Nivel</Link>
                    <Link to="/habits">Logros</Link>
                    <Link to="/habits">Ranking</Link>
                </div>

                {/** Opciones burger*/}
                <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} className="lg:hidden">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuItem>
                            <Link to="/habits">Hábitos</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/habits">Nivel</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/habits">Logros</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/habits">Ranking</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/habits">Perfil</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                            Log Out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </nav>
    )
}

export { Navbar }

