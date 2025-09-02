<?php

namespace App\Controller\Admin;

use App\Entity\Category;
use App\Entity\Question;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use EasyCorp\Bundle\EasyAdminBundle\Router\AdminUrlGenerator;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class DashboardController extends AbstractDashboardController
{
    #[Route('/admin', name: 'admin')]
    public function index(): Response
    {
        // Récupérer AdminUrlGenerator depuis le container
        $adminUrlGenerator = $this->container->get(AdminUrlGenerator::class);

        // Redirige directement vers le CRUD des questions
        $url = $adminUrlGenerator
            ->setController(QuestionCrudController::class)
            ->generateUrl();

        return $this->redirect($url);
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            // Favicon
            ->setFaviconPath('images/niort-logo.png')
            // Logo au-dessus du texte
            ->setTitle('<div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                            <img src="/images/niort-logo.png" style="height:60px; margin-bottom:10px;">
                            
                        </div>')
            ->renderContentMaximized();
    }

    public function configureMenuItems(): iterable
    {
        // Liens CRUD existants
        yield MenuItem::linkToCrud('Categories', 'fa fa-folder', Category::class);
        yield MenuItem::linkToCrud('Questions', 'fa fa-question', Question::class);

        // Séparateur vide
        yield MenuItem::section();

        // Nouvelle catégorie → Chatbase (URL externe)
        yield MenuItem::linkToUrl('Chatbase', 'fa fa-robot', 'https://www.chatbase.co/dashboard/eliott-taillepied-thomine---n-digitals-workspace/chatbot/6knjac3THVFxv9czJZUqt/playground')->setLinkTarget('_blank');

        // Nouvelle catégorie → Site public (URL externe)
        yield MenuItem::linkToUrl('Site Public', 'fa fa-globe', 'http://127.0.0.1:8000/') ->setLinkTarget('_blank'); // <-- remplace par ton site réel
    }

}
