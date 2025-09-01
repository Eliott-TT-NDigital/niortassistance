<?php

namespace App\Controller\Admin;

use App\Entity\Question;
use EasyCorp\Bundle\EasyAdminBundle\Controller\AbstractDashboardController;
use EasyCorp\Bundle\EasyAdminBundle\Config\Dashboard;
use EasyCorp\Bundle\EasyAdminBundle\Config\MenuItem;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class AdminController extends AbstractDashboardController
{
    #[Route('/admin', name: 'app_admin')]
    public function index(): Response
    {
        // Vérifie si la route 'admin_question_index' existe avant de rediriger
        try {
            return $this->redirect($this->generateUrl('admin_question_index'));
        } catch (\Exception $e) {
            // Sinon affiche un dashboard simple
            return $this->render('admin/index.html.twig', [
                'controller_name' => 'AdminController',
            ]);
        }
    }

    public function configureDashboard(): Dashboard
    {
        return Dashboard::new()
            ->setTitle('Niort Assistant');
    }

    public function configureMenuItems(): iterable
    {
        yield MenuItem::linktoDashboard('Dashboard', 'fa fa-home');
        yield MenuItem::linkToCrud('Questions', 'fa fa-question', Question::class);
    }
}
